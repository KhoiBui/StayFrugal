function json(response) {  
  return response.json()  
}


fetch("https://vision.googleapis.com/v1/images:annotate?key=AIzaSyCCvuW0sMXezimu5DDxZFcovYjw8oVgM5Q", {  
    method: 'post',  
    headers: {  
      "Content-Type": "application/json"  
    },  
    body: '{ \
  "requests":[ \
    { \
      "image":{ \
        "source":{ \
          "imageUri": \
            "https://images.nike.com/is/image/DotCom/PDP_HERO_ZOOM/511881_010_A_PREM/roshe-one-mens-shoe.jpg" \
        } \
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
  })
  .then(json)  
  .then(function (data) {
    let annotations = data.responses[0].labelAnnotations
    alert(annotations[0].description);
  })  
  .catch(function (error) {  
    console.log('Request failed', error);  
  });