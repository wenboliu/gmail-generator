rm -Rf target
mkdir target
cp -Rf chrome target/chrome
cp install.rdf target/install.rdf
cp chrome_1.manifest target/chrome.manifest
cd target/chrome
zip -r gmail-generator.jar content/* skin/* locale/*
rm -Rf content
rm -Rf skin
rm -Rf locale
cd ..
zip -r gmail-generator.xip install.rdf chrome.manifest chrome/gmail-generator.jar
