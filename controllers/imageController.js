const download = require('image-downloader')

const path = require('path')

const resizer = require('node-image-resizer')

const fs = require('fs');

let file = './images';

console.log("path is: ", path.join(__dirname, '../images'))

exports.imageProcessing = async function(req, res) {
    // Download Images with URL

const options = {
    url: 'https://pngimg.com/uploads/mario/mario_PNG125.png',
    dest: path.join(__dirname, '../images')              
  }
  
  await download.image(options)
    .then(({ filename }) => {
      console.log('Saved to', filename)  
    })
    .catch((err) => console.error(err))

// check if there are any files in folder

fs.readdir(file, function(err, files) {
    if (err) {
       console.log("Error")
    } else {
       if (!files.length) {
           console.log("Empty")
       }

       else{
           files.forEach((file) => {

            const setup = { 
                all: {
                  path: path.join(__dirname, '../thumbnails'),
                  quality: 80
                  
                },
                versions: [{
                  quality: 100,
                  prefix: 'small_',
                  width: 50,
                  height: 50
                }]
              };

               
              // create thumbnails


              (async () => {
                  try{
                    await resizer(path.join(__dirname, '../images', file), setup);
                    res.status(201).json({
                        status: "Success",
                        Message: "Image processed successfully."
                    })
                    console.log("normal:" + path.join(__dirname, '../images', file))
                    console.log("thumb: " + path.join(__dirname, '../thumbnails')) 
                    console.log("origin: " + path.join(__dirname, '../thumbnails' ))
                  }

                  catch(err) {
                      console.log("There is still some error: " + err)
                  }
                
              })();

            })
       }
    }
    
})    


}

