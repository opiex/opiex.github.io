/*jshint esversion: 6 */

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
var currentHexa = 0;
var showEmployed = 1;

var delay = 0;

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
        <p><a></a></p>
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

function createNewDiv(image, name, website, companies, status, email) {
  var div = document.createElement('div');
  var a = document.createElement('a');

  div.className = "item";
  div.innerHTML = item;

  var newName = div.getElementsByClassName("name")[0];
  var newWebsite = div.getElementsByClassName("website")[0].getElementsByTagName("a")[0];
  var newCompanies = div.getElementsByClassName("companies")[0].getElementsByTagName("p")[0];
  var newStatus = div.getElementsByClassName("status")[0].getElementsByTagName("p")[0];
  var newContact = div.getElementsByClassName("contact")[0].getElementsByTagName("a")[0];
  var newOverlay = div.getElementsByClassName("overlay")[0];
  // console.log(div.getElementsByClassName("name")[0]);

  //Name
  newName.append(name);

  //Website
  a.href = "http://" +website;
  $(a).addClass("linkOfItem");
  a.target = "_blank";
  newWebsite.append(website);
  // newWebsite.href = newWebsite;

  //Companies
  newCompanies.append(companies);

  //Current Status
  if (status === 'employed') {
    newStatus.append("Happily Employed 💼");
  } else if (status === 'freelance') {
    newStatus.append("Freelance 🖼");
  } else {
    newStatus.append("Looking for Opportunities ☺️");
  }

  //Email
  newContact.append(email);
  newContact.href = "mailto:" + email;

  //Done
  $(a).append(div);
  $('.items').append(a);

  //Background image + gradient
  newBackground = getRandomGradient() + ", url('img/designers/" + image + "') no-repeat center";
  $(newOverlay).css("background", newBackground);
}

// createNewDiv("0002.gif", "Ariel Verber", "www.arielverber.com", "YO", "employed", "hi@arielverber.com");
// createNewDiv("0001.gif", "Artiom Dashinsky", "www.arielverber.com", "YO", "freelance", "hi@arielverber.com");

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
    companies: "WIX, Horizon 2020, European Union",
    current: "employed",
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
    companies: "Pionet Group, JFrog, Kaminario, Discount Bank",
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

  // {
  //   img: "arielverber.png",
  //   name: "Ariel Verber",
  //   website: "www.arielverber.com",
  //   companies: "Waze, Mobilize",
  //   current: "freelance",
  //   contact: "hi@arielverber.com"
  // },

  {
    img: "valburtakov.gif",
    name: "Val Burtakov",
    website: "daskulll.tumblr.com",
    companies: "YOTPO, eBay, Purple",
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
  }
];

function toggleEmployed() {
  if (showEmployed === 0) {
    showEmployed = 1;
    $('.border').removeClass("faded");
    $('.toggle').removeClass("faded");
    moveInsideRight();
  } else {
    showEmployed = 0;
    $('.border').addClass("faded");
    $('.toggle').addClass("faded");
    moveInsideLeft();
  }
  loadElements();
}

shuffle(list);

function loadElements() {
  delay = 0;
  var j = 0;
  document.getElementsByClassName('items')[0].innerHTML = "";
  var current = "";
  console.log(showEmployed);
  if (showEmployed !== 0) {
    for (i = 0; i <= list.length - 1; i++) {
      current = list[i];
      createNewDiv(current.img, current.name, current.website, current.companies, current.current, current.contact);
      $('.numberofdesigners').html(i + 1);
    }
  } else {
    for (i = 0; i <= list.length - 1; i++) {
      current = list[i];
      if (current.current !== "employed") {
        createNewDiv(current.img, current.name, current.website, current.companies, current.current, current.contact);
        j++;
        $('.numberofdesigners').html(j);
      }
    }
  }
}

loadElements();

// $('.item').click()
