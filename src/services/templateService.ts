import Debug from 'debug';

import {
  getTemplatesByApplication,
  getPagedTemplates,
  filterByTemplateName,
} from '../db/query/templateQuery';

import R from 'ramda';

const debug = Debug('app:templateService');

const smashTemplate = (template: string, replacements: string): string => {
  let replacedTemplate = template;

  const replaceValueInTemplate = (replacement: string) => {
    const replacementSegments = R.split('=', replacement);

    if (replacementSegments.length == 2) {
      const key = replacementSegments[0];
      const value = replacementSegments[1];

      replacedTemplate = R.replace(key, value, replacedTemplate);
    }
  };

  const replacementVariables = R.split('|', replacements);
  R.forEach(replaceValueInTemplate, replacementVariables);

  return replacedTemplate;
};

const getTemplates = async (
  applicationId: number,
  page: string | undefined,
  name: string | undefined
) => {
  if (name !== undefined) {
    return await filterByName(applicationId, name);
  }

  if (page !== undefined) {
    return await pageTemplates(applicationId, Number(page));
  }

  return await getAllTemplates(applicationId);
};

async function getAllTemplates(applicationId: number) {
  return await getTemplatesByApplication(applicationId, 'name');
}

async function filterByName(applicationId: number, nameFilter: string) {
  return await filterByTemplateName(applicationId, nameFilter.toString());
}

async function pageTemplates(applicationId: number, page: number) {
  return await getPagedTemplates(
    page,
    Number(process.env.PAGE_SIZE),
    applicationId
  );
}

export { smashTemplate, getTemplates };
