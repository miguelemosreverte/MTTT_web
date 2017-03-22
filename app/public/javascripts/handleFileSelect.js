var progress_bars_by_tag = {};
/*text_locations links the name of the input in where to upload
  a text file with the id of the <!> in where to show the text
*/
var text_locations = {
  "MT": "#response3"
  // etc.
};

/*function_by_filename links the name of the input in where to upload
  a text file with function to perform with the new information
*/
var function_by_filename= {
  "MT": function (text) {
          $.ajax({
                  url:'',
                  type:'POST',
                  data:"{&TranslationInput="+text+"}",
                  success:function(result){
                      maybeSetText("MT",result);
                  }
          });
      }
};

function maybeSetText(tag,text){
  if (tag in text_locations)
  {
    $(text_locations[tag]).text(text);
  }
}

  function errorHandler(evt) {
    switch(evt.target.error.code) {
      case evt.target.error.NOT_FOUND_ERR:
        alert('File Not Found!');
        break;
      case evt.target.error.NOT_READABLE_ERR:
        alert('File is not readable');
        break;
      case evt.target.error.ABORT_ERR:
        break; // noop
      default:
        alert('An error occurred reading this file.');
    };
  }

  function updateProgress(evt,progress) {
    // evt is an ProgressEvent.
    if (evt.lengthComputable) {
      var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
      // Increase the progress bar length.
      if (percentLoaded < 100) {
        progress.style.width = percentLoaded + '%';
        progress.textContent = percentLoaded + '%';
      }
    }
  }

  function addEventListenerToFileUploads(evt, doc) {
    document=doc;
    var elements = document.getElementsByClassName('files');
    var progress_bars = document.getElementsByClassName('percent');

    for (let element of elements) {
      progress_bar = progress_bars[Object.keys(progress_bars_by_tag).length];
      progress_bars_by_tag[element.name] = progress_bar;
      element.addEventListener('change', handleFileSelect, false);
    }
  }

  function handleFileSelect(evt) {

    //tag examples: "LM" indicates that the file should be saved as the Language Model
    var tag = this.name;

    var progress = progress_bars_by_tag[tag];
    // Reset progress indicator on new file selection.
    progress.style.width = '10%';
    progress.textContent = '0%';

    var reader = new FileReader();
    reader.onerror = errorHandler;
    reader.onprogress = updateProgress(progress);
    reader.onabort = function(e) {
      alert('File read cancelled');
    };
    reader.onloadstart = function(e) {
      document.getElementById('progress_bar').className = 'loading';
    };
    reader.onload = function(e) {
      // Ensure that the progress bar displays 100% at the end.
      progress.style.width = '100%';
      progress.textContent = '100%';
      setTimeout("document.getElementById('progress_bar').className='';", 2000);
      maybeSetText(tag,e.target.result);
      if (tag in function_by_filename)
      {
        function_by_filename[tag](e.target.result);
      }
    }

    // Read in the image file as a binary string.
    reader.readAsBinaryString(evt.target.files[0]);
  }
/*
$(function(){
    $("#formoid").submit(function(event){
        event.preventDefault();

        $.ajax({
                url:'',
                type:'POST',
                data:$(this).serialize(),
                success:function(result){
                    alert(result);
                    $("#response").text(result);
                }
        });
    });

  });*/



//TODO specify which input is missing a file
  $(function(){
    $("#formoid").submit(function(event){
        event.preventDefault();
        var input = document.getElementById('files');
        if (!input.files[0]) {
          alert("Please select a file before clicking 'Load'");
        }
        else {
          file = input.files[0];
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function(e) {
                      // browser completed reading file - display it
                      //alert(e.target.result);
                      $.ajax({
                              url:'',
                              type:'POST',
                              data:"&src_lang=" + $("#src_lang").val() + "&trg_lang=" + $("#trg_lang").val() + '&TranslationInput=' + e.target.result + '&TM=' + $("#TM").val(),
                              success:function(result){
                                  $("#response3").text(JSON.stringify(result));
                              }
                            });
                  };
        }
    });
  });
