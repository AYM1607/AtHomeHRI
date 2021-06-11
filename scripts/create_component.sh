#!/bin/bash

if [ -z "$1" ]
then
	echo "Please provide component name in pascalCase:";
	read ComponentName;
else
	ComponentName=$1;
fi

echo $ComponentName;


# ComponentTemplateFileName="ComponentTemplate.js";
# ComponentsDir="../src/components/";

# ComponentTemplate=$(cat $ComponentTemplateFileName);

# echo $ComponentTemplate;

# cd $ComponentsDir;

# echo $ComponentTemplate > $1;

# echo "Component name $1";
# echo $ComponentsDir$1;
#

# touch $ComponentsDir$1;



# NewComponentFileName=$ComponentsDir$1".js";

# echo $NewComponentFileName;


# cat $ComponentTemplateFileName > $NewComponentFileName;

# sed -i '' -e "s/ComponentTemplate/$1/" $ComponentsDir$1