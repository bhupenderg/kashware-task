const download = require('image-downloader')

const path = require('path')

// const resizer = require('node-image-resizer')

const sharp = require('sharp');

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

await fs.readdir(file, function(err, files) {
    if (err) {
       console.log("Error")
       res.send(err)
    } else {
       if (!files.length) {
           console.log("Empty")
           res.send("No file Downloaded!")
       }

       else{
           files.forEach(async (file) => {

            // resize image

            await sharp(path.join(__dirname, '../images', file))
                  .resize(50, 50)
                  .toFormat('jpeg')
                  .toFile(path.join(__dirname, '../thumbnails', file + '.png'))

                  await fs.unlink(path.join(__dirname, '../images', file), (err) => {
                    if(err) {
                      console.log(err)
                    }
                      else{
                        console.log("Deleted from E")
                    }
                  })

            
                res.status(200).json({
                  status: "Success",
                  message: "Image processed successfully."
                })
    

                })
               
              

            
       }
    }
    
})    


}

