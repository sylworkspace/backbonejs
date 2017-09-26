const fs = require('fs');
const path = require('path');
const shelljs = require('shelljs');
const ktoolkit = require('ktoolkit');

const logger = ktoolkit.logger.output;

function main() {
  if ( process.argv.length < 5 ) {
    console.error('Usage: dev-cli <component/page> <add> <name>');
  }

  const componentType = process.argv[2];
  if ( componentType === 'component' ) {
    const operation = process.argv[3];
    const componentName = process.argv[4];

    if ( operation === 'add' ) {
      addComponent(componentName);
    }
  }
  else if ( componentType === 'page' ) {
    const operation = process.argv[3];
    const pageName = process.argv[4];

    if ( operation === 'add' ) {
      addPage(pageName);
    }
  }
}

function addComponent(componentName) {
  logger.info(`Add component ${componentName}`);
  installTemplate('component', componentName);
}

function addPage(pageName) {
  logger.info(`Add page ${pageName}`);
  installTemplate('page', pageName);
}

function installTemplate(type, name) {
  const moduleName = generateModuleName(name);
  const templateName = generateTemplateName(name);
  const viewName = generateViewName(name);

  logger.info(`Module name: ${moduleName}`);
  logger.info(`Template name: ${templateName}`);
  logger.info(`View name: ${viewName}`);

  const templatePath = path.join(__dirname, 'templates', type);
  const variables = {
    moduleName,
    templateName,
    viewName
  };

  const dest = `src/${type}s/${templateName}`;
  if ( existsDirectory(dest) ) {
    logger.error(`${type} ${name} exists. No processing.`);

    return;
  }

  logger.info(`Create directory ${dest}`);
  shelljs.mkdir('-p', dest);
  installTemplateFile(templatePath, 'index.js', dest, variables);
  installTemplateFile(templatePath, 'template.html', dest, variables);
  installTemplateFile(templatePath, 'style.css', dest, variables);
}

function existsDirectory(dir) {
  try {
    fs.accessSync(dir, fs.constants.F_OK);
  }
  catch (e) {
    return false;
  }

  return true;
}

function installTemplateFile(templatePath, fileName, dest, variables) {
  logger.info(`Installing file ${fileName} ...`);

  const srcFilePath = path.join(templatePath, fileName);
  const srcFileContent = fs.readFileSync(srcFilePath, 'utf-8');
  const destFilePath = path.join(dest, fileName);

  let destFileContent = srcFileContent;
  Object.keys(variables).forEach(variableName => {
    const variableValue = variables[variableName];

    destFileContent = destFileContent.split(`{{${variableName}}}`).join(variableValue);
  });

  fs.writeFileSync(destFilePath, destFileContent);
}

function generateModuleName(name) {
  return name.slice(0, 1).toLowerCase() + name.slice(1);
}

function generateTemplateName(name) {
  const characters = name.split('');
  const templateNameCharacters = characters.map((character, characterIndex) => {
    const codePoint = character.codePointAt(0);

    if ( codePoint >= 0x41 && codePoint < 0x5a ) {
      if ( characterIndex === 0 ) {
        return `${character.toLowerCase()}`;
      }

      return `-${character.toLowerCase()}`;
    }

    return character;
  });

  return templateNameCharacters.join('');
}

function generateViewName(name) {
  return name.slice(0, 1).toUpperCase() + name.slice(1);
}

main();
