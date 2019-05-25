const https = require('https');
/*
* Complete the function below.
* Use console.log to print the result, you should not return from the function.
* Base url: https://jsonmock.hackerrank.com/api/movies/search/?Title=
*/
async function getMovieTitles(substr) {
    let movies = [];
        
    movies = await getAllMovies(substr)
    
    console.log( getOrderedTitles(movies).join('\n'));
}

function getOrderedTitles(movies){
    let titles = [];
    for(let i = 0; i< movies.length; i++){
        titles.push(movies[i].Title);
    }
    return titles.sort();
}


async function getAllMovies(substr){
    let page = 1; 
    let res = await getPage(substr,page)
    let totalPages = res.total_pages;
    let all = res.data;

    for(page = 2; page<=totalPages; page++){
        res=await getPage(substr,page);
        all = all.concat(res.data);
    }
    
    return all
}



function getPage(substr, number){
    
    return new Promise(function(resolve, reject){  
    
        let url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}&page=${number}`;
        
        https.get(url, (res) => {
            res.on('data', (d) => {
                resolve(JSON.parse(d));
            });
        }).on('error', (e) => {
            console.error(e);
            reject (e);
        });    
    });


}

let test = 'spiderman'
let res = getMovieTitles(test);
