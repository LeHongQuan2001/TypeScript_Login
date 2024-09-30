import { Op } from "sequelize";
import Language from "../models/languageModel";
import { Sequelize } from "sequelize-typescript";

export const list = async (page: string = '1', limit: string = '10', search: string = ''): Promise<any> => {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    const pageNo = isNaN(pageNumber) ? 1 : pageNumber;
    const limitNo = isNaN(limitNumber) ? 10 : limitNumber;

    let languages;
    if (search && search != "") {
      const valueLowCase = search.toLowerCase();
      languages = await Language.findAll({
        where: {
          [Op.or]: [
            Sequelize.literal(
              `MATCH(name) AGAINST('${valueLowCase}' IN NATURAL LANGUAGE MODE)`
            ),
          ],
        },
      });
    } else {
      languages = await Language.findAll();
    }

    const startIndex = (pageNo - 1) * limitNo;
    const endIndex = pageNo * limitNo;
    const pages = Math.ceil(languages.length / limitNo);
    const result = languages.slice(startIndex, endIndex);
    return { result, pages };
};

export const listLanguages = async (): Promise<any> => {
  const languages = await Language.findAll();
  return { languages };
};

export const createInfoLanguage = async (language: any): Promise<any> => {
  console.log('language', language);
    const result = await Language.create(language);
    return result;
};

export const updateInfoLanguage = async (id: string, language: any): Promise<any> => {
    const result = await Language.update(language, { where: { id } });
    return result;
};

export const deleteInfoLanguage = async (ids: string[]): Promise<any> => {
    await Language.destroy({ where: { id: ids } });
};