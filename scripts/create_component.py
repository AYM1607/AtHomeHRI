import sys
import argparse
# from shutil import copyfile

componentsDir = '../src/components/'
defaultTemplateFileName = 'ComponentTemplate.js'

parser = argparse.ArgumentParser(description='Script for generating a component files.')
parser.add_argument('--name', '-n', help='New component name, MUST be PascalCase')
parser.add_argument('--template', '-t', help='React JS Component Template used to create component (file path)')


def IsPascalCase(s):
    return s != s.lower() and s != s.upper() and "_" not in s and s[0].isupper()


def createComponent(componentName, templateFileName):
    if not componentName:
        componentName = raw_input("Please provide the name for the component in PascalCase: ")

    if not templateFileName:
        templateFileName = defaultTemplateFileName

        print(templateFileName)

    if not IsPascalCase(componentName):
        print("Error: Component name MUST be PascalCase")
        parser.print_help()
        sys.exit()

    print("Creating component: {}".format(componentName))

    componentFileName = "{}{}.js".format(componentsDir, componentName)

    templateFile = open(templateFileName, "rt")
    componentFile = open(componentFileName, "wt")
    for line in templateFile:
        componentFile.write(line.replace('ComponentTemplate', componentName))
    templateFile.close()
    componentFile.close()

    print("Template file generated at: {}".format(componentFileName))



if __name__ == "__main__":
    args = parser.parse_args()
    createComponent(args.name, args.template)