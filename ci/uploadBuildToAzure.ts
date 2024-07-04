import { BlobServiceClient } from "@azure/storage-blob";
import * as fs from "fs";
import * as path from "path";

const connectionString = process.env.CONNECTION_STRING;

if (!connectionString) {
  throw new Error("Please set CONNECTION_STRING environment variable");
}

// Create BlobServiceClient
const blobServiceClient =
  BlobServiceClient.fromConnectionString(connectionString);

// Define the container name and blob path (including "directory" structure)
const containerName = "iparts";
const blobPath = process.env.IPART_PATH as string;

if (!blobPath) {
  throw new Error("Please set BLOB_PATH environment variable");
}

// Create a container client
const containerClient = blobServiceClient.getContainerClient(containerName);

// Path to the local directory
const localDirPath = path.resolve("./dist");

// Function to recursively upload directory
async function uploadDirectory(
  localPath: string,
  containerClient: any,
  remotePath: string,
) {
  const entries = fs.readdirSync(localPath, { withFileTypes: true });

  for (const entry of entries) {
    const localEntryPath = path.join(localPath, entry.name);
    const remoteEntryPath = remotePath
      ? `${remotePath}/${entry.name}`
      : entry.name;

    if (entry.isDirectory()) {
      // Recursively upload subdirectory
      await uploadDirectory(localEntryPath, containerClient, remoteEntryPath);
    } else if (entry.isFile()) {
      // Upload file
      const blockBlobClient =
        containerClient.getBlockBlobClient(remoteEntryPath);
      const fileContent = fs.readFileSync(localEntryPath);
      await blockBlobClient.upload(fileContent, fileContent.length);
      console.log(`Uploaded ${remoteEntryPath}`);
    }
  }
}

async function uploadDistDirectory() {
  try {
    // Ensure the container exists
    await containerClient.createIfNotExists();

    // Upload the contents of the dist directory
    await uploadDirectory(localDirPath, containerClient, blobPath);
    console.log("All files uploaded successfully.");
  } catch (error) {
    console.error("Error uploading directory:", error.message);
  }
}

uploadDistDirectory();
