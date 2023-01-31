export const bindIqa = (setInput: React.SetStateAction<any>) => {
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
  )
};