// Sample fictional players (1924-2000 era) — for demo only
const PLAYERS = [
  { id:1, name:"Alvaro Rossi", year:1932, position:"FWD", rating:88, price:75000 },
  { id:2, name:"Bernard Lowe", year:1948, position:"MID", rating:82, price:52000 },
  { id:3, name:"Carlos Mendes", year:1956, position:"DEF", rating:79, price:41000 },
  { id:4, name:"Dirk Hensen", year:1964, position:"GK", rating:83, price:46000 },
  { id:5, name:"Egil Sorensen", year:1938, position:"DEF", rating:85, price:60000 },
  { id:6, name:"Franco Vega", year:1972, position:"MID", rating:90, price:98000 },
  { id:7, name:"Gustav Petrov", year:1929, position:"FWD", rating:76, price:32000 },
  { id:8, name:"Hideo Tanaka", year:1950, position:"MID", rating:81, price:48000 },
  { id:9, name:"Ibrahim Khaled", year:1978, position:"DEF", rating:74, price:29000 },
  { id:10, name:"Jorge Milos", year:1960, position:"FWD", rating:86, price:70000 },
  { id:11, name:"Karel Novak", year:1942, position:"GK", rating:77, price:35000 },
  { id:12, name:"Luca Bianchi", year:1990, position:"MID", rating:91, price:120000 },
  { id:13, name:"Marek Dvorak", year:1926, position:"DEF", rating:73, price:27000 },
  { id:14, name:"Nikolai Orlov", year:1988, position:"FWD", rating:89, price:84000 },
  { id:15, name:"Owen Fitzgerald", year:1970, position:"MID", rating:80, price:45000 },
  { id:16, name:"Pablo Rivera", year:1958, position:"DEF", rating:78, price:40000 }
];

const $cards = document.getElementById('cards');
const $search = document.getElementById('search');
const $position = document.getElementById('positionFilter');
const $sort = document.getElementById('sortBy');
const $count = document.getElementById('count');

function initials(name){
  return name.split(' ').map(s=>s[0]).slice(0,2).join('').toUpperCase();
}

function colorFromString(s){
  let h=0; for(let i=0;i<s.length;i++) h = s.charCodeAt(i) + ((h<<5)-h);
  const hue = Math.abs(h) % 360;
  return `hsl(${hue} 70% 55%)`;
}

function createCard(p){
  const el = document.createElement('article');
  el.className = 'card';

  const avatar = document.createElement('div');
  avatar.className = 'avatar';
  avatar.textContent = initials(p.name);
  avatar.style.background = colorFromString(p.name);

  const info = document.createElement('div');
  info.className = 'info';

  const name = document.createElement('h3');
  name.className = 'name';
  name.textContent = p.name + ` (${p.year})`;

  const meta = document.createElement('div');
  meta.className = 'meta';

  const pos = document.createElement('div');
  pos.className = 'badge';
  pos.textContent = p.position;

  const rating = document.createElement('div');
  rating.className = 'rating';
  rating.innerHTML = `<span class="score">${p.rating}</span>/100`;

  const price = document.createElement('div');
  price.className = 'price';
  price.textContent = `€${(p.price).toLocaleString()}`;

  meta.appendChild(pos);
  meta.appendChild(rating);
  meta.appendChild(price);

  info.appendChild(name);
  info.appendChild(meta);

  el.appendChild(avatar);
  el.appendChild(info);

  return el;
}

function applyFilters(){
  const q = $search.value.trim().toLowerCase();
  const pos = $position.value;
  const sort = $sort.value;

  let list = PLAYERS.filter(p=>{
    if(pos !== 'all' && p.position !== pos) return false;
    if(q && !p.name.toLowerCase().includes(q)) return false;
    return true;
  });

  switch(sort){
    case 'rating-desc': list.sort((a,b)=>b.rating-a.rating); break;
    case 'rating-asc': list.sort((a,b)=>a.rating-b.rating); break;
    case 'price-asc': list.sort((a,b)=>a.price-b.price); break;
    case 'price-desc': list.sort((a,b)=>b.price-a.price); break;
    case 'name-asc': list.sort((a,b)=>a.name.localeCompare(b.name)); break;
  }

  render(list);
}

function render(list){
  $cards.innerHTML = '';
  if(list.length === 0){
    const empty = document.createElement('div');
    empty.style.color = 'var(--muted)';
    empty.textContent = 'No players found.';
    $cards.appendChild(empty);
  } else {
    const frag = document.createDocumentFragment();
    list.forEach(p=>frag.appendChild(createCard(p)));
    $cards.appendChild(frag);
  }
  $count.textContent = `Showing ${list.length} player${list.length===1? '':'s'}`;
}

$search.addEventListener('input', ()=>applyFilters());
$position.addEventListener('change', ()=>applyFilters());
$sort.addEventListener('change', ()=>applyFilters());

// initial render
render(PLAYERS.slice().sort((a,b)=>b.rating-a.rating));
