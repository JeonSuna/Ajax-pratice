let input = document.querySelector('#input')
let button = document.querySelector('#button')
let result = document.querySelector('#result')

button.addEventListener('click', function () {
    let xhr = new XMLHttpRequest()
    xhr.open('get', 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=dc866225b86b43ee8f20b1c9bc0613cf', true)
    xhr.onload = function () {
        let searchReault = xhr.responseText
        let resultObj = JSON.parse(searchReault)
        let rows = resultObj['articles']
        let resultTxt = ''
        console.log('api 응답', rows)
        console.log('검색어',input.value)

        let filterArticle = rows.filter((value) => {
            let valid = input.value.trim()
            let regex = new RegExp(valid, 'i')
            
            let matchTitle = regex.test(value.title)
            let matchContent = regex.test(value.content)
            let matchResult = matchTitle || matchContent
            console.log(`title: ${value.title}, Match:${matchTitle}`)
            return matchResult;
        })

        if (filterArticle.length === 0) {
            result.innerHTML = '검색결과가 없습니다'
            return
      }
        for (let i = 0; i < filterArticle.length; i++) {
            let title = filterArticle[i]['title']
            // let description = filterArticle[i]['description']
            let publishedAt = filterArticle[i]['publishedAt']
            let content = filterArticle[i]['content']
            let author = filterArticle[i]['author']
            let urlLink = filterArticle[i]['url']
            let imgUrl = filterArticle[i]['urlToImage']

            resultTxt += `
              <article>
              <section>
                    <div id='header'>   
                    <h3>${title}</h3>
                     <img src="${imgUrl}" alt="">
                     </div>
                    <div id="information">
                        <p id="author">${author}</p>
                        <p id="publishedAt">${publishedAt}</p>
                        <a href="${urlLink}" target="_balnk">more</a>       

                    </div>
               </section>
                <p id="description">${content}</p>
                </article>
            `


        }
        result.innerHTML = resultTxt
        input.value=''
    }
    xhr.send()
})


    //url링크들 onclick함수로 어떻게 가져오는지 ..?
