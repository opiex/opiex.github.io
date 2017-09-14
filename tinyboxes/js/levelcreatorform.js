var validator;

function submitThanks(){
  validateAll();
  console.log(validator);
  if(validator){
  createStage();
  }
}

function validateAll() {
  validator = true;
    validateName();
    validateLevelName();
    validateUrl();
}

$("input").focus(function() {
    $(this).removeClass("error");
});

function validateName() {
  if($("input:text[name=creatorName]").val()){
  }
  else{
    $("input:text[name=creatorName]").addClass("error");
    validator = false;
  }
}

function validateLevelName() {
    if($("input:text[name=levelName]").val()){
    }
    else{
      $("input:text[name=levelName]").addClass("error");
      validator = false;
    }
}

function validateUrl() {
    var url = $("input:text[name=creatorUrl]").val();
    var urlregex = new RegExp(/[-a-zA-Z0-9@:%._\+~#/=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/);
    var urlValidator = urlregex.test(url);
    if (!urlValidator){
        $("input:text[name=creatorUrl]").addClass("error");
        validator = false;
    }
  }

function createStage(){
    var form = $( ".submit-form" );
    var emailBody =
    '//please keep the bottom element unchanged. you can add a personal message before it.// %0D%0A %0D%0A'
    + JSON.stringify(form.serializeObject());

    console.log(form.serializeObject());
    window.location = 'mailto:' + 'opiedesigns@gmail.com' + '?subject=' + 'Hey Ariel, check out my level for Tiny Boxes' + '&body=' +   emailBody;
};

$.fn.serializeObject = function () {
    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    o.path = mapString;
    return o;
};
