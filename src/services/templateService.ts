import Debug from 'debug';
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

export { smashTemplate };
