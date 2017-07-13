var elements = document.getElementsByTagName('*');

function json(response) {  
  return response.json()  
}

function is_similar(url) {
  let b = '{ \
  "requests":[ \
    { \
      "image":{ \
        "source":{ \
          "imageUri": '
             + "\"" + String(url) + "\"" +
        '} \
      }, \
      "features":[ \
        { \
          "type":"LABEL_DETECTION", \
          "maxResults":10 \
        } \
      ] \
    } \
  ] \
}'  
  return fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCCvuW0sMXezimu5DDxZFcovYjw8oVgM5Q", {  
    method: 'post',  
    headers: {  
      "Content-Type": "application/json"  
    },  
    body: b
  })
  .then(json)  
  .then(function (data) {
    console.log(data)
    let annotations = data.responses[0].labelAnnotations;
    for (var i = 0; i < annotations.length; i++) {
        if(annotations[i].description === "logo"){
            return true;
        }
    }
    return false;
  })  
  .catch(function (error) {  
    console.log('Request failed', error);  
  });
}

// async function print() {
//   var result = await is_similar("https://www.pediwear.co.uk/image/glossary/7.jpg");
//   console.log(result);
// }

// print()


for (var i = 0; i < elements.length; i++) {
    var element = elements[i];

    for (var j = 0; j < element.childNodes.length; j++) {
        var node = element.childNodes[j];

        if (node.nodeType === 3) {
            var text = node.nodeValue;
            var replacedText = text.replace(/Workday/gi, 'Oracle');

            if (replacedText !== text) {
                element.replaceChild(document.createTextNode(replacedText), node);
            }
        }

        else if (node.nodeType === 2) {

        }
    }
}

async function replace() {
    var images = document.images

    for (var i = 0; i < images.length; i++) {
        var image = images[i];
        var img_url = image.src
        if(await is_similar(img_url)){
            image.src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Kim_Jong-Un_Photorealistic-Sketch.jpg/220px-Kim_Jong-Un_Photorealistic-Sketch.jpg"
        }
    }
}

replace()
