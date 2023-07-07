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

export const bindContentPage = (input: string) => {
  const businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL =
    new BusinessDocumentBrowserProperties();
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.RootFolder =
    "@/";
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.AllowUpwardNavigation =
    true;
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.ShowAddress =
    false;
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.AutoPostBack =
    false;
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.ValueControlID =
    input;
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.DocumentVersionKeyValueControlID =
    "ctl00_TemplateBody_ctl01";
  businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL.ShowMenu =
    false;
  return BusinessDocumentBrowserControl_Select(
    businessDocumentBrowserPropertiesctl00_TemplateBody_ContentOrURL
  );
};

export const user = typeof userContext !== "undefined" ? userContext : {};

//For use on account pages with ID API calls
export const selectedId: string = window.location.search
  .split("ID=")[1]
  ?.split("&")[0]
  ? window.location.search.split("ID=")[1]?.split("&")[0]
  : JSON.parse(document.querySelector("#__ClientContext")?.value)
      .selectedPartyId;