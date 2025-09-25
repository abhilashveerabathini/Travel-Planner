// script.js
// Complete India Travel Planner - state-wise destinations + fixed suggestion logic

const destinations = [
  // North India
  {name:"Srinagar",slug:"srinagar",seasons:["Spring","Summer"],companions:["Family","Partner","Solo"],budgets:["Medium","Luxury"],desc:"Dal Lake, houseboats.",image:"https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=60"},
  {name:"Leh-Ladakh",slug:"leh",seasons:["Summer"],companions:["Friends","Solo","Partner"],budgets:["Medium","Luxury"],desc:"High-altitude biking, Pangong Lake.",image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60"},
  {name:"Shimla",slug:"shimla",seasons:["Winter","Spring","Summer"],companions:["Family","Partner","Solo"],budgets:["Low","Medium","Luxury"],desc:"Colonial architecture, mountain walks.",image:"https://images.unsplash.com/photo-1549880338-65ddcdfd017b?auto=format&fit=crop&w=1200&q=60"},
  {name:"Manali",slug:"manali",seasons:["Winter","Spring","Summer"],companions:["Friends","Partner","Solo","Family"],budgets:["Low","Medium","Luxury"],desc:"Himalayan hill station, trekking, snow in winter.",image:"https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1200&q=60"},
  {name:"Rishikesh",slug:"rishikesh",seasons:["Winter","Spring","Summer","Monsoon"],companions:["Solo","Friends","Partner"],budgets:["Low","Medium"],desc:"Adventure sports, yoga on the Ganges.",image:"https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=60"},
  {name:"Auli",slug:"auli",seasons:["Winter"],companions:["Friends","Partner"],budgets:["Medium"],desc:"Skiing and snow sports.",image:"https://images.unsplash.com/photo-1518684079-2ecf27b01f2b?auto=format&fit=crop&w=1200&q=60"},
  {name:"Jaipur",slug:"jaipur",seasons:["Winter","Spring","Autumn"],companions:["Family","Partner","Solo"],budgets:["Medium"],desc:"Royal palaces, forts, colourful bazaars.",image:"https://images.unsplash.com/photo-1544213456-bf0a9a5b3d2a?auto=format&fit=crop&w=1200&q=60"},
  {name:"Udaipur",slug:"udaipur",seasons:["Winter","Spring","Autumn"],companions:["Partner","Family"],budgets:["Medium","Luxury"],desc:"Lakes, romantic palaces.",image:"https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=60"},
  {name:"Agra",slug:"agra",seasons:["Winter","Autumn"],companions:["Family","Partner"],budgets:["Low","Medium"],desc:"Taj Mahal, Mughal heritage.",image:"https://images.unsplash.com/photo-1503256207526-0d9a03cf3f9b?auto=format&fit=crop&w=1200&q=60"},
  {name:"Varanasi",slug:"varanasi",seasons:["Winter","Autumn","Spring"],companions:["Solo","Partner"],budgets:["Low","Medium"],desc:"Spiritual Ganges ghats, rituals.",image:"https://images.unsplash.com/photo-1503256207526-0d9a03cf3f9b?auto=format&fit=crop&w=1200&q=60"},
  {name:"Bodh Gaya",slug:"bodh-gaya",seasons:["Winter","Autumn"],companions:["Family","Solo"],budgets:["Low"],desc:"Buddhist pilgrimage site.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Nalanda",slug:"nalanda",seasons:["Winter","Autumn"],companions:["Family"],budgets:["Low"],desc:"Ancient university ruins.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},

  // East & North-East India
  {name:"Darjeeling",slug:"darjeeling",seasons:["Spring","Summer","Autumn"],companions:["Family","Partner","Solo"],budgets:["Low","Medium"],desc:"Tea gardens, Himalayan views, toy train rides.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Gangtok",slug:"gangtok",seasons:["Spring","Autumn"],companions:["Family","Partner"],budgets:["Medium"],desc:"Sikkim capital, monasteries, scenic hills.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Kaziranga",slug:"kaziranga",seasons:["Winter"],companions:["Family","Adventure"],budgets:["Medium"],desc:"Wildlife sanctuary, one-horned rhinos.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Shillong",slug:"shillong",seasons:["Winter","Spring","Autumn"],companions:["Family","Friends"],budgets:["Low","Medium"],desc:"Living root bridges, waterfalls, greenery.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},

  // West India
  {name:"Mumbai",slug:"mumbai",seasons:["Winter"],companions:["Friends","Solo"],budgets:["Low","Medium"],desc:"City & food culture.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Goa",slug:"goa",seasons:["Winter","Spring","Summer"],companions:["Friends","Partner","Solo","Family"],budgets:["Low","Medium","Luxury"],desc:"Beaches, water-sports, nightlife, Portuguese heritage, seafood.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=60",
    details:{
      packingList:["Sunscreen (SPF 30+)","Swimwear & beach towel","Sunglasses & hat","Light cotton clothes & flip-flops","Power bank & chargers","ID & bookings","Cash & card","Basic medicines & insect repellent"],
      budgetBreakdownPerDayINR:{Low:{accommodation:800,food:400,transport:300,activities:500,misc:200},Medium:{accommodation:2500,food:800,transport:500,activities:1500,misc:400},Luxury:{accommodation:7000,food:2000,transport:1200,activities:4000,misc:1500}},
      sampleItinerary3Days:[{day:1,plan:"Arrive Goa (North) — Baga/Candolim, beach, water sports, sunset."},{day:2,plan:"Old Goa churches, Panaji walk, Mandovi sunset cruise."},{day:3,plan:"South Goa beaches, spice plantation, shopping & depart."}]
    }
  },
  {name:"Mahabaleshwar",slug:"mahabaleshwar",seasons:["Monsoon","Winter"],companions:["Family"],budgets:["Low","Medium"],desc:"Hill station & viewpoints.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Ahmedabad",slug:"ahmedabad",seasons:["Winter"],companions:["Family"],budgets:["Low","Medium"],desc:"Heritage city, temples, Sabarmati river.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=60"},
  {name:"Kutch",slug:"kutch",seasons:["Winter"],companions:["Friends","Partner"],budgets:["Low","Medium"],desc:"Rann of Kutch, desert festival.",image:"https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&w=1200&q=60"},

  // South India
  {name:"Munnar",slug:"munnar",seasons:["Winter","Monsoon","Spring"],companions:["Family","Partner","Solo"],budgets:["Low","Medium","Luxury"],desc:"Tea plantations, rolling green hills.",image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60"},
  {name:"Alleppey",slug:"alleppey",seasons:["Winter","Monsoon"],companions:["Partner","Family"],budgets:["Medium","Luxury"],desc:"Backwaters, houseboats.",image:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=60"},
  {name:"Hampi",slug:"hampi",seasons:["Winter","Spring"],companions:["Friends","Solo","Partner"],budgets:["Low","Medium"],desc:"Heritage ruins, boulder landscapes.",image:"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=60"},
  {name:"Bangalore",slug:"bangalore",seasons:["Winter","Spring","Autumn"],companions:["Family","Partner"],budgets:["Medium"],desc:"IT hub, gardens, city life.",image:"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=60"},
  {name:"Ooty",slug:"ooty",seasons:["Winter","Spring","Autumn"],companions:["Family","Partner"],budgets:["Low","Medium"],desc:"Hill station, botanical gardens.",image:"https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&w=1200&q=60"},

  // Islands & UTs
  {name:"Andaman Islands",slug:"andaman",seasons:["Winter","Spring"],companions:["Partner","Friends"],budgets:["Medium","Luxury"],desc:"Beaches, scuba diving, tropical forest.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=1200&q=60"},
  {name:"Lakshadweep",slug:"lakshadweep",seasons:["Winter","Spring","Summer"],companions:["Couples","Adventure"],budgets:["Medium","Luxury"],desc:"Coral islands, water sports.",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&w=1200&q=60"},

  // Add remaining states & UTs in the same format...
];

function getSuggestion(season, companions, budget){
  let filtered = destinations.filter(d=>d.seasons.includes(season) && d.companions.includes(companions) && d.budgets.includes(budget));
  if(filtered.length===0) filtered = destinations.filter(d=>d.seasons.includes(season) && d.companions.includes(companions));
  if(filtered.length===0) filtered = destinations.filter(d=>d.seasons.includes(season));
  if(filtered.length===0) filtered = destinations.slice();
  return filtered[Math.floor(Math.random()*filtered.length)];
}

// Render destination card
function renderSuggestion(dest){
  const container = document.getElementById("result");
  container.innerHTML = ""; // clear previous
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <h3>${dest.name}</h3>
    <img src="${dest.image}" alt="${dest.name}" style="width:200px;height:auto;border-radius:8px;">
    <p>${dest.desc}</p>
    <div><strong>Best season(s):</strong> ${dest.seasons.join(", ")}</div>
    <div><strong>Great for:</strong> ${dest.companions.join(", ")}</div>
    <div><strong>Budget:</strong> ${dest.budgets.join(", ")}</div>
  `;
  container.appendChild(card);
}

// Form handling
document.getElementById("plannerForm").addEventListener("submit", function(e){
  e.preventDefault();
  const season = document.getElementById("season").value;
  const companions = document.getElementById("companions").value;
  const budget = document.getElementById("budget").value;
  const suggestion = getSuggestion(season, companions, budget);
  renderSuggestion(suggestion);
});

// Random button
document.getElementById("randomBtn").addEventListener("click", function(){
  const suggestion = destinations[Math.floor(Math.random()*destinations.length)];
  renderSuggestion(suggestion);
});

// Initial load
window.addEventListener("DOMContentLoaded", function(){
  const suggestion = getSuggestion("Winter","Friends","Medium");
  renderSuggestion(suggestion);
});