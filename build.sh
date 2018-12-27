cd dev
echo "Compilando proyectos: "
getLocation= dir
echo $getLocation 

cd admin 
echo "\e[1;34mCompilando admin ...\e[0m"
sudo npm run build
cd ../panel
echo "\e[1;34mCompilando panel ...\e[0m"
sudo npm run build
cd ../user
echo "\e[1;34mCompilando user ...\e[0m"
sudo npm run build
exit

