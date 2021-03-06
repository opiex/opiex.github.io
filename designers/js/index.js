/*jshint esversion: 6 */

function changeFavicon(img) {
    var favicon = document.querySelector('link[rel="shortcut icon"]');

    if (!favicon) {
        favicon = document.createElement('link');
        favicon.setAttribute('rel', 'shortcut icon');
        var head = document.querySelector('head');
        head.appendChild(favicon);
    }


    favicon.setAttribute('type', 'image/png');
    favicon.setAttribute('href', img);
}

var hexas = [
  '7200FF',
  '0062FF',
  'FF3992',
  'DEA300',
  '00FFE4',
  '8A1E6E',
  'E43162',
  '1E2F8A'
];

var oks = [
  '👌', '👌🏻', '👌🏼', '👌🏽', '👌🏾', '👌🏿'
];
var currentRandom = Math.floor(Math.random() * oks.length);
var newOk = oks[currentRandom];
var ok = $('.side-headline').find('span');
ok.text(newOk);
changeFavicon('img/favicon'+currentRandom+'.png');

var currentHexa = 0;
var showEmployed = 1;

var delay = 0;

var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

function shuffle(a) {
  var j,
    x,
    i;
  for (i = a.length; i; i--) {
    j = Math.floor(Math.random() * i);
    x = a[i - 1];
    a[i - 1] = a[j];
    a[j] = x;
  }
}

var item = `
  <div class=\"leftside\">
    <h2 class=\"name\"></h2>
  </div>
  <div class=\"rightside\">
    <div class=\"details\">
      <div class=\"website\">
        <h4>Website:</h4>
        <p><a target=\"_blank\"></a></p>
      </div>
      <div class=\"companies\">
        <h4>Worked with:</h4>
        <p></p>
      </div>
      <div class=\"status\">
        <h4>Currently:</h4>
        <p></p>
      </div>
      <div class=\"contact\">
        <h4>Contact:</h4>
        <p><a class="showemail">Show email</a><a class="email"></a></p>
      </div>
    </div>
  </div>
  <div class=\"overlay\">
  </div>
`;


function moveInsideLeft() {
  $('.inside').removeClass('insideright').addClass('insideleft');
}

function moveInsideRight() {
  $('.inside').removeClass('insideleft').addClass('insideright');
}

function getRandomGradient() {
  return 'linear-gradient(224deg, ' + getnextHexa() + ' 0%, rgba(9,17,28,0.00) 100%)';
}

function getnextHexa() {
  if (currentHexa === hexas.length - 1) {
    currentHexa = 0;
    return '#' + hexas[hexas.length - 1];
  } else {
    currentHexa++;
    return '#' + hexas[currentHexa - 1];
  }
}

function generateGradient() {
  return "#7200FF";
}

function createNewDiv(image, name, website, companies, status, email, isNew = "false") {
  var div = document.createElement('div');
  var a = document.createElement('a');

  div.className = "item";
  div.innerHTML = item;

  var newName = div.getElementsByClassName("name")[0];
  var newWebsite = div.getElementsByClassName("website")[0].getElementsByTagName("a")[0];
  var newCompanies = div.getElementsByClassName("companies")[0].getElementsByTagName("p")[0];
  var newStatus = div.getElementsByClassName("status")[0].getElementsByTagName("p")[0];
  var newContact = div.getElementsByClassName("contact")[0].getElementsByClassName("email")[0];
  var newOverlay = div.getElementsByClassName("overlay")[0];

  //Name
  newName.append(name);

  //Website
  a.href = "http://" +website;
  $(a).addClass("linkOfItem");

  a.target = "_blank";
  newWebsite.append(website);
  $(a).on("click", function() { websiteVisit(name) });

  //Companies
  newCompanies.append(companies);

  //Current Status
  if (status === 'employed') {
    newStatus.append("Happily Employed 💼");
  } else if (status === 'freelance') {
    newStatus.append("Freelance 🎨");
  }
  else if (status === 'busyfreelance') {
    newStatus.append("Freelance, but busy 🏋️");
  }
  else {
    newStatus.append("Looking for Opportunities 🖼");
  }

  //Email
  newContact.append(email);
  newContact.href = "mailto:" + email;

  //new badge
  if(isNew==="true"){
    var newBadge = document.createElement('div');
    newBadge.className = "new-badge";
    newBadge.innerHTML = "new";
    $(newOverlay).after(newBadge);
  }

  //Done
  $(a).append(div);
  $('.items').append(a);

  //Background image + gradient

  if (isMobile){
    newBackground = '#2F3236';
  }
  else{
    newBackground = getRandomGradient() + ", url('img/designers/" + image + "') no-repeat center";
  }
  $(newOverlay).css("background", newBackground);
}

var list = [
  {
    img: "tevihirshhorn.jpg",
    name: "Tevi Hirschhorn",
    website: "www.tevster.com",
    companies: "-",
    current: "employed",
    contact: "tevi@tevster.com"
  }, {
    img: "liatabadi.jpg",
    name: "Liat Abadi",
    website: "abadiguard.com",
    companies: "Better Place, JPEGmini, Unomy",
    current: "employed",
    contact: "liat@abadiguard.com"
  }, {
    img: "hilapeleg.gif",
    name: "Hila Peleg",
    website: "www.behance.net/hilapeleg",
    companies: "Inkod Hypera ltd, Slidely, Playbuzz",
    current: "employed",
    contact: "hilapeleg1984@gmail.com "
  }, {
    img: "eyalzuri.png",
    name: "Eyal Zuri",
    website: "dribbble.com/eyalz",
    companies: "Muzli, InVision, Netcraft",
    current: "employed",
    contact: "zurieyal@gmail.com"
  }, {
    img: "robinkane.gif",
    name: "Robin Kane",
    website: "www.robinkane-art-house.com/",
    companies: "Wix, Create, European Union",
    current: "freelance",
    contact: "robinkane.art@gmail.com"
  }, {
    img: "edenvidal.png",
    name: "Eden Vidal",
    website: "edenvidal.com",
    companies: "YOTPO, Alooma, Zebra Medical",
    current: "freelance",
    contact: "edenvidal@gmail.com"
  }, {
    img: "lironcohen.png",
    name: "Liron Cohen",
    website: "lironic-design.com",
    companies: "BlueVine. Armis. Culture trip",
    current: "freelance",
    contact: "lironicdesign@gmail.com"
  }, {
    img: "adammorad.png",
    name: "Adam Morad",
    website: "dribbble.com/Adammorad",
    companies: "Netvertise, Yotpo, Wisdo",
    current: "employed",
    contact: "Adammorad7@gmail.com"
  }, {
    img: "roihiman.png",
    name: "Roi Himan",
    website: "roi-himan.com",
    companies: "Wix",
    current: "employed",
    contact: "roihim@gmail.com"
  }, {
    img: "izikrachman.png",
    name: "Izik Rachman",
    website: "www.izikrachman.com",
    companies: "Fiverr, Intel",
    current: "freelance",
    contact: "izik.rachman@gmail.com"
  }, {
    img: "nathanfreifeld.png",
    name: "Nathan Freifeld",
    website: "www.nathanfreifeld.com/",
    companies: "Mobilize, Spot.IM, Saatchi&Saatchi",
    current: "employed",
    contact: "nfreifeld@gmail.com"
  }, {
    img: "limorpeleg.png",
    name: "Limor Peleg",
    website: "www.behance.net/peleglimor0aeb",
    companies: "Pionet Group, JFrog, Kaminario",
    current: "freelance",
    contact: "peleg.limor@gmail.com"
  }, {
    img: "alextrue.jpg",
    name: "Alex True",
    website: "alex-true.com",
    companies: "Publicis Digital, Moburst and Freelance",
    current: "unemployed",
    contact: "trublenkov@gmail.com"
  }, {
    img: "omerfrank.png",
    name: "Omer Frank",
    website: "mrfrank.me",
    companies: "Waves, Polyverse",
    current: "freelance",
    contact: "omer@frankscreative.com"
  }, {
    img: "eladnaider.png",
    name: "Elad Naider",
    website: "dribbble.com/eladnaider",
    companies: "HP, SaferVPN",
    current: "employed",
    contact: "eladnaider@gmail.com"
  }, {
    img: "omerassa.gif",
    name: "Omer Assa",
    website: "dribbble.com/Omerico",
    companies: "Mreshet, Zeek, torii",
    current: "employed",
    contact: "omer@jointorii.co"
  }, {
    img: "artiomdashinsky.gif",
    name: "Artiom Dashinsky",
    website: "www.dashinsky.com",
    companies: "WeWork, InVision, SodaStream",
    current: "freelance",
    contact: "hvoostik@gmail.com"
  }, {
    img: "galshir.gif",
    name: "Gal Shir",
    website: "www.galshir.com",
    companies: "Lemonade",
    current: "employed",
    contact: "hello@galshir.com"
  },

  {
    img: "arielverber.png",
    name: "Ariel Verber",
    website: "www.arielverber.com",
    companies: "Waze, Mobilize, Slide.ly",
    current: "freelance",
    contact: "hi@arielverber.com"
  },

  {
    img: "valburtakov.gif",
    name: "Val Burtakov",
    website: "daskull.tumblr.com",
    companies: "YOTPO, GoUFO, Purple",
    current: "employed",
    contact: "valentinburtakov@gmail.com"
  },

  {
    img: "marinasokolov.png",
    name: "Marina Sokolov",
    website: "www.marinzart.com",
    companies: "Juno, eToro, Spot.IM",
    current: "employed",
    contact: "marinz.box@gmail.com"
  },
  {
    img: "urizur.jpg",
    name: "Uri Zur",
    website: "www.urizur.com",
    companies: "Sears, Waze, Zlango",
    current: "employed",
    contact: "uriandzur@gmail.com"
  },
  {
    img: "sagischreiber.png",
    name: "Sagi Shrieber",
    website: "www.instagram.com/sagishrieber",
    companies: "Fiverr, SimilarWeb, Ebay",
    current: "freelance",
    contact: "sagishrieber@gmail.com"
  },
  {
    img: "avichaybaras.png",
    name: "Avichai Baras",
    website: "baras.co",
    companies: "Wix, Netcraft, Rollout",
    current: "unemployed",
    contact: "avichai@baras.co"
  },
  {
    img: "naorhazan.png",
    name: "Naor Hazan",
    website: "www.linkedin.com/in/naor-hazan-434069105/",
    companies: "Woo, glide, flok",
    current: "employed",
    contact: "Naorhazan22@gmail.com"
  },
  {
    img: "guyisacar.jpg",
    name: "Guy Isacar",
    website: "www.guyisacar.co",
    companies: "eToro, OverOps, Convexum",
    current: "freelance",
    contact: "guy.isacar@gmail.com"
  },
  {
    img: "lexnau.png",
    name: "Alexander Sidorenko",
    website: "www.behance.net/LEXNAU",
    companies: "Ebay, HP, JUNO",
    current: "unemployed",
    contact: "lexnau.contact@gmail.com"
  },
  {
    img: "liatzeldes.gif",
    name: "Liat Zeldes",
    website: "liatzeldes.com",
    companies: "alpha, soomla, lightricks",
    current: "busyfreelance",
    contact: "liat.zeldes@gmail.com"
  },
  {
    img: "ohadshalev.png",
    name: "Ohad Shalev",
    website: "www.poratshalev.com",
    companies: "Wix, Perion, Foresight",
    current: "freelance",
    contact: "ohad@poratshalev.com"
  },
  {
    img: "sagimaori.png",
    name: "Sagi Maori",
    website: "dribbble.com/SagiMaori",
    companies: "Philips, Microsof",
    current: "employed",
    contact: "sagimao@gmail.com"
  },
  {
    img: "evgeniykaz.gif",
    name: "Evgeniy Kazinec",
    website: "dribbble.com/EvgeniyKazinec",
    companies: "dapulse, Simbla",
    current: "employed",
    contact: "vzlomk@gmail.com"
  },
  {
    img: "kerenhossy.png",
    name: "Keren Hossy",
    website: "www.behance.net/keren_h",
    companies: "Fiverr, Sears",
    current: "employed",
    contact: "kerenhossy@gmail.com"
  },
  {
    img: "benfrank.gif",
    name: "Ben Frankforter",
    website: "www.benfrankforter.com",
    companies: "Tipit, BillGuard, Arik Ben Simhon",
    current: "unemployed",
    contact: "benfrankforter@gmail.com"
  },
  {
    img: "ilya.jpg",
    name: "Ilya Boruhov",
    website: "www.behance.net/ibsgraphic",
    companies: "Wix, Amdocs, Sizmek",
    current: "employed",
    contact: "ibsgraphic@gmail.com"
  },
  {
    img: "ronitklein.png",
    name: "Ronit Klein",
    website: "dribbble.com/ronit-klein",
    companies: "Netcraft, Wix, Create",
    current: "freelance",
    contact: "ronitk@createfuture.co.il"
  },
  {
    img: "yarontamuz.png",
    name: "Yaron Tamuz",
    website: "yarontamuz.com",
    companies: "Gett, Geektime, Demisto",
    current: "employed",
    contact: "studio@yarontamuz.com"
  },
  {
    img: "yaronazulay.png",
    name: "Yaron Azulay",
    website: "dribbble.com/yaronaz",
    companies: "Wix, Saatchi & Saatchi",
    current: "employed",
    contact: "yaronaz@gmail.com"
  },
  {
    img: "nuritbahat.jpg",
    name: "Nurit Bahat",
    website: "www.behance.net/nukib",
    companies: "Webydo, ichannel, Honeybook",
    current: "employed",
    contact: "nurabfree@gmail.com"
  },
  {
    img: "hadasboneh.jpg",
    name: "Hadas Boneh",
    website: "www.hadasboneh.com",
    companies: "Seebo, Bizzabo, 3 Bears studio",
    current: "freelance",
    contact: "hadasboneh@gmail.com"
  },
  {
    img: "jenok.png",
    name: "Yevgeny Kanterman",
    website: "www.jenokman.com",
    companies: "Mobli, Any.do, Engie",
    current: "freelance",
    contact: "yevkan@gmail.com",
    new: "true"
  },
  {
    img: "semion.jpg",
    name: "Semion Bolter",
    website: "Behance.net/sbolter",
    companies: "Amdocs, Everest, Netcraft",
    current: "employed",
    contact: "hello@bolter.digital",
    new: "true"
  },
  {
    img: "shiranaflalo.png",
    name: "Shiran Aflalo",
    website: "dribbble.com/shiran_aflalo",
    companies: "HERE Technologies, Sears Israel, Toluna",
    current: "employed",
    contact: "shiranafla@gmail.com",
    new: "true"
  },
  {
    img: "rotem.png",
    name: "Rotem Elimelech",
    website: "adoric.com",
    companies: "Wix, Pampers, Adoric",
    current: "busyfreelance",
    contact: "rotem914@gmail.com",
    new: "true"
  },
  {
    img: "yuvalkesh.gif",
    name: "Yuval Keshtcher",
    website: "instagram.com/yuvalkesh1/",
    companies: "SodaStream, Shlomo Sixt, Gool",
    current: "busyfreelance",
    contact: "yuval.kesh@gmail.com",
    new: "true"
  }
];

function toggleEmployed() {
  if (showEmployed === 0) {
    showEmployed = 1;
    $('.border').removeClass("faded");
    $('.toggle').removeClass("faded");
    moveInsideRight();
    ga('send', 'event', 'Toggle', 'Toggle Off', '1');
  } else {
    showEmployed = 0;
    $('.border').addClass("faded");
    $('.toggle').addClass("faded");
    moveInsideLeft();
    ga('send', 'event', 'Toggle', 'Toggle On', '2');
  }
  loadElements();

}

function websiteVisit(name){
  console.log(name);
  ga('send','event','click', 'websitevisit', name, '4');
}

shuffle(list);



function loadElements() {
  delay = 0;
  var j = 0;
  document.getElementsByClassName('items')[0].innerHTML = "";
  var current = "";
  if (showEmployed !== 0) {
    for (i = 0; i <= list.length - 1; i++) {
      current = list[i];
      createNewDiv(current.img, current.name, current.website, current.companies, current.current, current.contact, current.new);
      $('.numberofdesigners').html(i + 1);
    }
  } else {
    for (i = 0; i <= list.length - 1; i++) {
      current = list[i];
      if (current.current !== "employed") {
        createNewDiv(current.img, current.name, current.website, current.companies, current.current, current.contact, current.new);
        j++;
        $('.numberofdesigners').html(j);
      }
    }
  }



  $('.showemail').on("click", function(e){
    e.preventDefault();
    ga('send', 'event', 'Email Request', 'Email Requested', '3');
    var email = $(this).next();
    $(this).fadeOut(function(){
      email.fadeIn();
    });
  });

}

loadElements();

// $('.item').click()
