(function($){

$('.slide-group').slick({
    autoplay:true,
    autoplaySpeed:3000,
    speed:600,
    dots:true,
    arrows:true,
    pauseOnFocus:false,     // 화살표나 도트버튼 클릭시 자동실행 정지안함
    prevArrow:'<button class="slick-arrow slick-prev"><i class="fa-solid fa-angle-left"></i></button>',
    nextArrow:'<button class="slick-arrow slick-next"><i class="fa-solid fa-angle-right"></i></button>',
    // responsive:[{
    //     breakpoint:1025,
    //     settings:{
    //         arrows:false
    //     }
    // }]
})


let imgh = ($('.slide .img').height() / 2) - 35
$('.article1 .slick-arrow').css({
    top:'0%',
    transform:`translateY(${imgh}px)`,
})

// 글자수가 40글자 이상이면 40글자까지만 보이게 하고 말줄임표 붙여줌
// 글자수가 40글자 미만이면 40-현재글자수 만큼 빈공백을 붙여줌
$('.article4 ul li p').each(function(){
    let text = $(this).text()
    let newText = text.substr(0, 40)
    if ( text.length>=40 ) {
        $(this).text(newText+'...')
    } else {  
        let count = 40 - text.length
        for ( let i=0; i<count; i++ ) { text += "&nbsp; " }
        $(this).html(text)
    }
})


$(window).on('resize', function(){
    let imgh = ($('.slide .img').height() / 2) - 35
    $('.article1 .slick-arrow').css({
        top:'0%',
        transform:`translateY(${imgh}px)`,
    })
})


// let article2Near = $('.article2').offset().top - $(window).height()/2
// let article4Near = $('.article4').offset().top - $(window).height()/2

let article2Near = $('.article2').offset().top + $('.article2').outerHeight()/5;
let article4Near = $('.article4').offset().top + $('.article2').outerHeight()/5;

$(window).on('scroll', function(){
    // let sct = $(this).scrollTop()
    let sct = $(this).scrollTop() + $(this).height(); 
    if (sct>=article2Near) {
        $('.article2').addClass('on')
    } else {
        $('.article2').removeClass('on')
    }

    if (sct>=article4Near) {
        $('.article4').addClass('on')
    } else {
        $('.article4').removeClass('on')
    }

})


// 탭메뉴 제목(.tabmenu li)을 클릭하면 관련 내용 박스(.contents > div)가 보이도록 할것
$('.tabmenu li').on('click', function(){
    let num = $(this).index()
    $(this).addClass('active').siblings().removeClass('active')
    $('.contents > div').eq(num).addClass('active').siblings().removeClass('active')
    // $(this).parent().next().children('div').eq(num).addClass('active').siblings().removeClass('active')
})


// article4 구역의 돋보기 클릭하면 이미지를 모달창에서 크게 보기
$('.article4 ul li .zoom a:first-child').on('click', function(){
    let href = $(this).attr('href')
    let src = $(this).parent().prev().attr('src')
    // let modal = `<div class="modal">`
    // modal += `<div class="imgbox">`
    // modal += `<a href="${href}" target="_blank">`
    // modal += `<img src="${src}" alt="">`
    // modal += `</a>`
    // modal += `<button type="button">닫기</button>`
    // modal += `</div>`
    // modal += `</div>`
    // $('body').append(modal)

    $('body').append(`<div class="modal"></div>`)
    $('.modal').prepend(`<div class="imgbox"></div>`)
    $('.imgbox').prepend(`<a href="${href}" target="_blank"></a>`)
    $('.imgbox a').after(`<button type="button">닫기</button>`)
    $('.imgbox a').append(`<img src="${src}" alt="">`)

    $('.modal').css({
        position:'fixed',
        top:0,
        left:0,
        width:'100%',
        height:'100%',
        background:'rgba(0,0,0,0.5)'
    })
    $('.modal .imgbox').css({
        position:'absolute',
        width:'700px',
        top:'50%',
        left:'50%',
        transform:'translate(-50%, -50%)'
    })
    $('.modal .imgbox button').css({
        position:'absolute',
        top:'0',
        right:'0',
        background:'#000',
        color:'#fff',
        padding:'5px 10px'
    })

    return false
})


// 모달창의 닫기 버튼 클릭하면 모달창 닫게 하기
$('body').on('click', '.modal button, .modal', function(){
    $('.modal').remove()
})

// 모달창의 링크걸린 이미지를 클릭했을때 모달창 닫히는것 막기
$('body').on('click', '.modal a', function(e){
    e.stopPropagation()
})

})(jQuery);