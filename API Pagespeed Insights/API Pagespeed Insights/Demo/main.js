const API_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=https://';
const API_URL2 = '&locale=vi';
const API_URL3 =  '&category=seo';
const input = document.querySelector('input');
const imageSection = document.querySelector('.images');
const form = document.querySelector('form');


form.addEventListener('submit', formSubmitted);
document.getElementById('progress').style.display = 'none'; 
document.getElementById('ls').style.display = 'none'; 
document.getElementById('ls2').style.display = 'none'; 
document.getElementById('output').style.display = 'none'; 
document.getElementById('tt').style.display = 'none'; 
document.getElementById('img').style.display = 'none'; 

function formSubmitted(event) {
    document.getElementById('searchTerm').disabled= true; 
    event.preventDefault();
    var searchTerm = input.value;
    if(searchTerm.includes('http')){
        searchTerm = searchTerm.replace("https://","");
    }
    searchStart();
    search(searchTerm)
    .then(() => {
        document.getElementById('progress').style.display = 'none'; 
        document.getElementById('searchTerm').disabled= false;
    });
}

function searchStart() {
    document.getElementById('progress').style.display = 'none'; 
    document.getElementById('ls').style.display = 'none';
    document.getElementById('ls2').style.display = 'none'; 
    document.getElementById('output').style.display = 'none'; 
    document.getElementById('tt').style.display = 'none'; 
    document.getElementById('img').style.display = 'none'; 
}
function search(searchTerm){
    const url1 = `${API_URL}${searchTerm}${API_URL2}`;
    const url2 = `${url1}${API_URL3}`
    const urls =[
        url1,
        url2
    ];
    console.log(urls);
    document.getElementById('progress').style.display = '';  

    return Promise.all(urls.map(url => fetch(url)))
    .then(resp => Promise.all( resp.map(r => r.json()) ))
    .then(result => {
    console.log(result);
    document.getElementById('ls').style.display = ''; 
    document.getElementById('ls2').style.display = ''; 
    document.getElementById('output').style.display = ''; 
    document.getElementById('tt').style.display = ''; 
    document.getElementById('img').style.display = ''; 
    document.getElementById('progress').style.display = 'none';       
    var myob= $.parseJSON(JSON.stringify(result[0]));
    var myob2= $.parseJSON(JSON.stringify(result[1]));
    document.getElementById('output').innerHTML= 'ID: '+ myob.id;
    document.getElementById('outputb').innerHTML= 'ID: '+ myob2.id;

    document.getElementById('output2').innerHTML= 'Thời gian tải trang có Hiển thị nội dung đầu tiên (FCP) có tốc độ: '+ myob.loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS.category;
    document.getElementById('output3').innerHTML= 'Trang có Thời gian phản hồi tương tác (FID): ' +myob.loadingExperience.metrics.FIRST_INPUT_DELAY_MS.category;
    document.getElementById('output4').innerHTML= 'First content paint LH: ' + myob.lighthouseResult.audits['first-contentful-paint'].displayValue;
    document.getElementById('output5').innerHTML= 'Speed Index LH: ' + myob.lighthouseResult.audits['speed-index'].displayValue;
    document.getElementById('output6').innerHTML= 'Interactive: ' + myob.lighthouseResult.audits['interactive'].displayValue;
    document.getElementById('output7').innerHTML= 'First meaningful paint: ' + myob.lighthouseResult.audits['first-meaningful-paint'].displayValue;
    document.getElementById('output8').innerHTML= 'First cpu idle: ' + myob.lighthouseResult.audits['first-cpu-idle'].displayValue;
    document.getElementById('output9').innerHTML= 'Estimated input latency: ' + myob.lighthouseResult.audits['estimated-input-latency'].displayValue;

    if(myob.lighthouseResult.audits['dom-size'].score==null){
        document.getElementById('dom').style='';
        document.getElementById('dom').classList.add("black");
        document.getElementById('output1011').innerHTML= 'Page insights không lấy được dữ liệu! ';
    } 
    else if( myob.lighthouseResult.audits['dom-size'].score<0.5)
    {
        document.getElementById('dom').style='';
        document.getElementById('dom').classList.add("ac");
        document.getElementById('output10').innerHTML= myob.lighthouseResult.audits['dom-size'].displayValue;
        document.getElementById('output11').innerHTML= myob.lighthouseResult.audits['dom-size']['details']['items']['1'].value;
        document.getElementById('output12').innerHTML= myob.lighthouseResult.audits['dom-size']['details']['items']['2'].value;
    }else if(myob.lighthouseResult.audits['dom-size'].score>0.9){
        document.getElementById('dom').style='';
        document.getElementById('dom').classList.add("ad");
    }else if(myob.lighthouseResult.audits['dom-size'].score<0.9 && myob.lighthouseResult.audits['dom-size'].score>=0.5){
        document.getElementById('dom').style='';
        document.getElementById('dom').classList.add("ab");
        document.getElementById('output10').innerHTML= myob.lighthouseResult.audits['dom-size'].displayValue;
        document.getElementById('output11').innerHTML= myob.lighthouseResult.audits['dom-size']['details']['items']['1'].value;
        document.getElementById('output12').innerHTML= myob.lighthouseResult.audits['dom-size']['details']['items']['2'].value;
    }
    
    if(myob.lighthouseResult.audits['font-display'].score==null){
        document.getElementById('font').style='';
        document.getElementById('font').classList.add("black");
        document.getElementById('tf11').innerHTML= 'Page insights không lấy được dữ liệu! ';
        document.getElementById('tf12').innerHTML='';
    } 
    else if( myob.lighthouseResult.audits['font-display'].score<0.5)
    {   
        document.getElementById('tf11').innerHTML='';
        document.getElementById('tf12').innerHTML='';
        document.getElementById('font').style='';
        document.getElementById('font').classList.add("ac");
        for(var k=0 in myob.lighthouseResult.audits['font-display']['details']['items']){
        
            document.getElementById('tf11').innerHTML+= myob.lighthouseResult.audits['font-display']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf12').innerHTML+= myob.lighthouseResult.audits['font-display']['details']['items'][k].wastedMs + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }else if(myob.lighthouseResult.audits['font-display'].score>0.9){
        document.getElementById('font').style='';
        document.getElementById('font').classList.add("ad");
        document.getElementById('tf11').innerHTML='';
        document.getElementById('tf12').innerHTML='';
    }else if(myob.lighthouseResult.audits['font-display'].score<0.9 && myob.lighthouseResult.audits['font-display'].score>=0.5){
        document.getElementById('font').style='';
        document.getElementById('font').classList.add("ab");
        document.getElementById('tf11').innerHTML='';
        document.getElementById('tf12').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['font-display']['details']['items']){
        
            document.getElementById('tf11').innerHTML+= myob.lighthouseResult.audits['font-display']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf12').innerHTML+= myob.lighthouseResult.audits['font-display']['details']['items'][k].wastedMs + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        } }     
    
    if(myob.lighthouseResult.audits['total-byte-weight'].score==null){
        document.getElementById('tByte').style='';
        document.getElementById('tByte').classList.add("black");
        document.getElementById('tf9').innerHTML= 'Page insights không lấy được dữ liệu! ';
        document.getElementById('tf10').innerHTML='';
    }      
    else if( myob.lighthouseResult.audits['total-byte-weight'].score<0.5)
    {
        document.getElementById('tByte').style='';
        document.getElementById('tByte').classList.add("ac");
        document.getElementById('tf9').innerHTML='';
        document.getElementById('tf10').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['total-byte-weight']['details']['items']){
        
            document.getElementById('tf9').innerHTML+= myob.lighthouseResult.audits['total-byte-weight']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf10').innerHTML+= myob.lighthouseResult.audits['total-byte-weight']['details']['items'][k].totalBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }else if(myob.lighthouseResult.audits['total-byte-weight'].score>0.9){
        document.getElementById('tByte').style='';
        document.getElementById('tByte').classList.add("ad");
        document.getElementById('tf9').innerHTML='';
        document.getElementById('tf10').innerHTML='';
    }else if(myob.lighthouseResult.audits['total-byte-weight'].score<0.9 && myob.lighthouseResult.audits['total-byte-weight'].score>=0.5){
        document.getElementById('tByte').style='';
        document.getElementById('tByte').classList.add("ab");
        document.getElementById('tf9').innerHTML='';
        document.getElementById('tf10').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['total-byte-weight']['details']['items']){
        
            document.getElementById('tf9').innerHTML+= myob.lighthouseResult.audits['total-byte-weight']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf10').innerHTML+= myob.lighthouseResult.audits['total-byte-weight']['details']['items'][k].totalBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }
    
    if(myob.lighthouseResult.audits['mainthread-work-breakdown'].score==null){
        document.getElementById('thread').style='';
        document.getElementById('thread').classList.add("black");
        document.getElementById('output25').innerHTML= 'Page insights không lấy được dữ liệu! ';
    }else if( myob.lighthouseResult.audits['mainthread-work-breakdown'].score<0.5)
    {
        document.getElementById('thread').style='';
        document.getElementById('thread').classList.add("ac");
        document.getElementById('output25').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['0'].groupLabel;
        document.getElementById('output26').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['1'].groupLabel;
        document.getElementById('output27').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['2'].groupLabel;
        document.getElementById('output28').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['3'].groupLabel;
        document.getElementById('output29').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['4'].groupLabel;
        document.getElementById('output30').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['5'].groupLabel;
        document.getElementById('output31').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['6'].groupLabel;
        document.getElementById('output32').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['0'].duration + ' ms';
        document.getElementById('output33').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['1'].duration + ' ms';
        document.getElementById('output34').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['2'].duration + ' ms';
        document.getElementById('output35').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['3'].duration + ' ms';
        document.getElementById('output36').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['4'].duration + ' ms';
        document.getElementById('output37').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['5'].duration + ' ms';
        document.getElementById('output38').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['6'].duration + ' ms';

    }else if(myob.lighthouseResult.audits['mainthread-work-breakdown'].score>0.9){
        document.getElementById('thread').style='';
        document.getElementById('thread').classList.add("ad");
    }else if(myob.lighthouseResult.audits['mainthread-work-breakdown'].score<0.9 && myob.lighthouseResult.audits['mainthread-work-breakdown'].score>=0.5){
        document.getElementById('thread').style='';
        document.getElementById('thread').classList.add("ab");
        document.getElementById('output25').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['0'].groupLabel;
        document.getElementById('output26').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['1'].groupLabel;
        document.getElementById('output27').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['2'].groupLabel;
        document.getElementById('output28').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['3'].groupLabel;
        document.getElementById('output29').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['4'].groupLabel;
        document.getElementById('output30').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['5'].groupLabel;
        document.getElementById('output31').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['6'].groupLabel;
        document.getElementById('output32').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['0'].duration + ' ms';
        document.getElementById('output33').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['1'].duration + ' ms';
        document.getElementById('output34').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['2'].duration + ' ms';
        document.getElementById('output35').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['3'].duration + ' ms';
        document.getElementById('output36').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['4'].duration + ' ms';
        document.getElementById('output37').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['5'].duration + ' ms';
        document.getElementById('output38').innerHTML= myob.lighthouseResult.audits['mainthread-work-breakdown']['details']['items']['6'].duration + ' ms';

    }

    if(myob.lighthouseResult.audits['bootup-time'].score==null){
        document.getElementById('boot').style='';
        document.getElementById('boot').classList.add("black");
        document.getElementById('output39').innerHTML= 'Page insights không lấy được dữ liệu! ';
    }else if( myob.lighthouseResult.audits['bootup-time'].score<0.5)
    {
        document.getElementById('boot').style='';
        document.getElementById('boot').classList.add("ac");
        document.getElementById('output39').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].url;
        document.getElementById('output40').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].total +' ms';
        document.getElementById('output41').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].scriptParseCompile + ' ms';
        document.getElementById('output42').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].url;
        document.getElementById('output43').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].total +' ms';
        document.getElementById('output44').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].scriptParseCompile + ' ms';
        document.getElementById('output45').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].url;
        document.getElementById('output46').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].total + ' ms';
        document.getElementById('output47').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].scriptParseCompile + ' ms';
        
    }else if(myob.lighthouseResult.audits['bootup-time'].score>0.9){
        document.getElementById('boot').style='';
        document.getElementById('boot').classList.add("ad");
    }else if(myob.lighthouseResult.audits['bootup-time'].score<0.9 && myob.lighthouseResult.audits['bootup-time'].score>=0.5){
        document.getElementById('boot').style='';
        document.getElementById('boot').classList.add("ab");
        document.getElementById('output39').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].url;
        document.getElementById('output40').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].total +' ms';
        document.getElementById('output41').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['0'].scriptParseCompile + ' ms';
        document.getElementById('output42').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].url;
        document.getElementById('output43').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].total +' ms';
        document.getElementById('output44').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['2'].scriptParseCompile + ' ms';
        document.getElementById('output45').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].url;
        document.getElementById('output46').innerHTML=  myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].total + ' ms';
        document.getElementById('output47').innerHTML= myob.lighthouseResult.audits['bootup-time']['details']['items']['3'].scriptParseCompile + ' ms';

    }    

    if(myob.lighthouseResult.audits['uses-optimized-images'].score==null){
        document.getElementById('uses').style='';
        document.getElementById('uses').classList.add("black");
        document.getElementById('tf7').innerHTML= 'Page insights không lấy được dữ liệu! ';
        document.getElementById('tf8').innerHTML='';
    }
    else if( myob.lighthouseResult.audits['uses-optimized-images'].score<0.5)
    {
        document.getElementById('uses').style='';
        document.getElementById('uses').classList.add("ac");
        document.getElementById('tf7').innerHTML='';
        document.getElementById('tf8').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-optimized-images']['details']['items']){
        
            document.getElementById('tf7').innerHTML+= myob.lighthouseResult.audits['uses-optimized-images']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf8').innerHTML+= myob.lighthouseResult.audits['uses-optimized-images']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }else if(myob.lighthouseResult.audits['uses-optimized-images'].score>=0.9){
        document.getElementById('uses').style='';
        document.getElementById('uses').classList.add("ad");
        document.getElementById('tf7').innerHTML='';
        document.getElementById('tf8').innerHTML='';
    }else if(myob.lighthouseResult.audits['uses-optimized-images'].score<0.9 && myob.lighthouseResult.audits['uses-optimized-images'].score>=0.5){
        document.getElementById('uses').style='';
        document.getElementById('uses').classList.add("ab");
        document.getElementById('tf7').innerHTML='';
        document.getElementById('tf8').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-optimized-images']['details']['items']){
        
            document.getElementById('tf7').innerHTML+= myob.lighthouseResult.audits['uses-optimized-images']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf8').innerHTML+= myob.lighthouseResult.audits['uses-optimized-images']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }}

    if(myob.lighthouseResult.audits['uses-webp-images'].score==null){
        document.getElementById('webp').style='';
        document.getElementById('webp').classList.add("black");
        document.getElementById('tf5').innerHTML= 'Page insights không lấy được dữ liệu! ';
        document.getElementById('tf6').innerHTML='';
    }else if( myob.lighthouseResult.audits['uses-webp-images'].score<0.5)
    {
        document.getElementById('webp').style='';
        document.getElementById('webp').classList.add("ac");
        document.getElementById('tf5').innerHTML='';
        document.getElementById('tf6').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-webp-images']['details']['items']){
        
            document.getElementById('tf5').innerHTML+= myob.lighthouseResult.audits['uses-webp-images']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf6').innerHTML+= myob.lighthouseResult.audits['uses-webp-images']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }else if(myob.lighthouseResult.audits['uses-webp-images'].score>=0.9){
        document.getElementById('webp').style='';
        document.getElementById('webp').classList.add("ad");
    }else if(myob.lighthouseResult.audits['uses-webp-images'].score<0.9 && myob.lighthouseResult.audits['uses-optimized-images'].score>=0.5){
        document.getElementById('webp').style='';
        document.getElementById('webp').classList.add("ab");
        document.getElementById('tf5').innerHTML='';
        document.getElementById('tf6').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-webp-images']['details']['items']){
        
            document.getElementById('tf5').innerHTML+= myob.lighthouseResult.audits['uses-webp-images']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf6').innerHTML+= myob.lighthouseResult.audits['uses-webp-images']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }

    if(myob.lighthouseResult.audits['uses-long-cache-ttl'].score==null){
        document.getElementById('longcache').style='';
        document.getElementById('longcache').classList.add("black");
        document.getElementById('tf3').innerHTML= 'Page insights không lấy được dữ liệu! ';
        document.getElementById('tf4').innerHTML='';
    }else if( myob.lighthouseResult.audits['uses-long-cache-ttl'].score<0.5)
    {
        document.getElementById('longcache').style='';
        document.getElementById('longcache').classList.add("ac");
        document.getElementById('tf3').innerHTML='';
        document.getElementById('tf4').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items']){
        
            document.getElementById('tf3').innerHTML+= myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf4').innerHTML+= myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }else if(myob.lighthouseResult.audits['uses-long-cache-ttl'].score>=0.9){
        document.getElementById('longcache').style='';
        document.getElementById('longcache').classList.add("ad");
        document.getElementById('tf3').innerHTML='';
        document.getElementById('tf4').innerHTML='';
    }else if(myob.lighthouseResult.audits['uses-long-cache-ttl'].score<0.9 && myob.lighthouseResult.audits['uses-optimized-images'].score>=0.5){
        document.getElementById('longcache').style='';
        document.getElementById('longcache').classList.add("ab");
        document.getElementById('tf3').innerHTML='';
        document.getElementById('tf4').innerHTML='';
        for(var k=0 in myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items']){
        
            document.getElementById('tf3').innerHTML+= myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items'][k].url + '</br></br>';
            document.getElementById('tf4').innerHTML+= myob.lighthouseResult.audits['uses-long-cache-ttl']['details']['items'][k].wastedBytes + 'kb' + '</br></br>';
    
            if(k>10)
                break;
        }
    }
    
    if(myob.lighthouseResult.audits['unminified-css'].score==null){
        
    }else if( myob.lighthouseResult.audits['unminified-css'].score<0.5)
    {
        document.getElementById('ucss').classList.add("ac");
        
    }else if(myob.lighthouseResult.audits['unminified-css'].score>=0.9){
        document.getElementById('ucss').classList.add("ad");
    }else if(myob.lighthouseResult.audits['unminified-css'].score<0.9 && myob.lighthouseResult.audits['uses-optimized-images'].score>=0.5){
        document.getElementById('ucss').classList.add("ab");    
    }

    if(myob.lighthouseResult.audits['unminified-javascript'].score==null){        
    }else if( myob.lighthouseResult.audits['unminified-javascript'].score<0.5)
    {
        document.getElementById('ujs').classList.add("ac");
        
    }else if(myob.lighthouseResult.audits['unminified-javascript'].score>=0.9){
        document.getElementById('ujs').classList.add("ad");
    }else if(myob.lighthouseResult.audits['unminified-javascript'].score<0.9 && myob.lighthouseResult.audits['uses-optimized-images'].score>=0.5){
        document.getElementById('ujs').classList.add("ab");    
    }

    if( myob2.lighthouseResult.audits['image-alt'].score==null){
        document.getElementById('seo').style='';
        document.getElementById('seo').classList.add("black");
        document.getElementById('tf').innerHTML= 'Page insights không lấy được dữ liệu! ';
    }
    else if( myob2.lighthouseResult.audits['image-alt'].score<0.5)
    {
        document.getElementById('seo').style='';
        document.getElementById('seo').classList.add("ac");
        document.getElementById('tf').innerHTML='';
        document.getElementById('tf2').innerHTML='';
        for(var k in myob2.lighthouseResult.audits['image-alt']['details']['items']){
        
            document.getElementById('tf').innerHTML+= (myob2.lighthouseResult.audits['image-alt']['details']['items'][k]['node'].snippet).replace("<img","") + '</br>';
            document.getElementById('tf2').innerHTML+=myob2.lighthouseResult.audits['image-alt']['details']['items'][k]['node'].path + '</br>';
    
            if(k>10)
                break;
        }
    }else if(myob2.lighthouseResult.audits['image-alt'].score>0.9){
        document.getElementById('seo').style='';
        document.getElementById('seo').classList.add("ad");
        document.getElementById('tf').innerHTML='';
        document.getElementById('tf2').innerHTML='';
    }else if(myob2.lighthouseResult.audits['image-alt'].score<0.9 && myob2.lighthouseResult.audits['image-alt'].score>=0.5){
        document.getElementById('seo').style='';
        document.getElementById('seo').classList.add("ab");
        document.getElementById('tf').innerHTML='';
        document.getElementById('tf2').innerHTML='';
        for(var k in myob2.lighthouseResult.audits['image-alt']['details']['items']){
        
            document.getElementById('tf').innerHTML+= myob2.lighthouseResult.audits['image-alt']['details']['items'][k]['node'].snippet + '</br>';
            document.getElementById('tf2').innerHTML+=myob2.lighthouseResult.audits['image-alt']['details']['items'][k]['node'].path + '</br>';
    
            if(k>10)
                break;
        }
    }
    
    if( myob2.lighthouseResult.audits['hreflang'].score==null){
        document.getElementById('seo2').classList.add("black");
        document.getElementById('tf13').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['hreflang'].score<0.5)
    {
        document.getElementById('seo2').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['hreflang'].score>0.9){
        document.getElementById('seo2').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['hreflang'].score<0.9 && myob2.lighthouseResult.audits['hreflang'].score>=0.5){
        document.getElementById('seo2').classList.add("ab");
    }

    if( myob2.lighthouseResult.audits['is-crawlable'].score==null){
        document.getElementById('seo3').classList.add("black");
        document.getElementById('tf14').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['is-crawlable'].score<0.5)
    {
        document.getElementById('seo3').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['is-crawlable'].score>0.9){
        document.getElementById('seo3').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['is-crawlable'].score<0.9 && myob2.lighthouseResult.audits['is-crawlable'].score>=0.5){
        document.getElementById('seo3').classList.add("ab");
    }
    
    if( myob2.lighthouseResult.audits['font-size'].score==null){
        document.getElementById('seo4').classList.add("black");
        document.getElementById('tf15').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['font-size'].score<0.5)
    {
        document.getElementById('seo4').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['font-size'].score>0.9){
        document.getElementById('seo4').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['font-size'].score<0.9 && myob2.lighthouseResult.audits['font-size'].score>=0.5){
        document.getElementById('seo4').classList.add("ab");
    }

    if( myob2.lighthouseResult.audits['document-title'].score==null){
        document.getElementById('seo5').classList.add("black");
        document.getElementById('tf16').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['document-title'].score<0.5)
    {
        document.getElementById('seo5').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['document-title'].score>0.9){
        document.getElementById('seo5').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['document-title'].score<0.9 && myob2.lighthouseResult.audits['document-title'].score>=0.5){
        document.getElementById('seo5').classList.add("ab");
    }

    if( myob2.lighthouseResult.audits['link-text'].score==null){
        document.getElementById('seo6').classList.add("black");
        document.getElementById('tf17').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['link-text'].score<0.5)
    {
        document.getElementById('seo6').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['link-text'].score>0.9){
        document.getElementById('seo6').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['link-text'].score<0.9 && myob2.lighthouseResult.audits['document-title'].score>=0.5){
        document.getElementById('seo6').classList.add("ab");
    }

    if( myob2.lighthouseResult.audits['http-status-code'].score==null){
        document.getElementById('seo7').classList.add("black");
        document.getElementById('tf18').innerHTML= 'Page insights không lấy được dữ liệu! ';

    }
    else if( myob2.lighthouseResult.audits['http-status-code'].score<0.5)
    {
        document.getElementById('seo7').classList.add("ac");
    }else if(myob2.lighthouseResult.audits['http-status-code'].score>0.9){
        document.getElementById('seo7').classList.add("ad");
    }else if(myob2.lighthouseResult.audits['http-status-code'].score<0.9 && myob2.lighthouseResult.audits['document-title'].score>=0.5){
        document.getElementById('seo7').classList.add("ab");
    }
    return result;
    });
}