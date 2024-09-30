import Language from "../models/languageModel";

export const listLanguages = async (): Promise<any> => {
  const languages = await Language.findAll();
  return { languages };
};
