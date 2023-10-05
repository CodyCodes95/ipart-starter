// @ts-nocheck

export const bindIqa = (setInput: (input: string) => void) => {
  OpenObjectBrowserSized(
    "TypeFilter=FOL,IQD",
    (sender, args) => {
      try {
        setInput(sender.SelectedDocumentPath || "");
      } catch (exc) {
        console.log(exc);
      }
    },
    true,
    true
  );
};


//For use on account pages with ID API calls
export const selectedId: string = window.location.search
  .split("ID=")[1]
  ?.split("&")[0]
  ? window.location.search.split("ID=")[1]?.split("&")[0]
  : JSON.parse(document.querySelector("#__ClientContext")?.value)
      .selectedPartyId;