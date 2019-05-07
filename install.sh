cd dev
echo "Compilando proyectos: "
getLocation= dir
echo $getLocation 

cd admin 
echo "\e[1;34mInstalando admin ...\e[0m"
 npm install
cd ../panel
echo "\e[1;34mInstalando panel ...\e[0m"
 npm install
cd ../user
echo "\e[1;34mInstalando user ...\e[0m"
 npm install
exit

