
let $ =(selector)=> document.querySelector(selector)
let $$ =(selector)=> document.querySelectorAll(selector)

let tilting = 0
let transformations = []

let transform =(x, y, z)=>
{
    transformations[0].style.transform = `rotateX(${-8*y+4}deg)
                                          rotateY(${-8*x}deg)
                                          rotateZ(${-z}deg)
                                          translateX(${-80*x}px)
                                          translateY(${-20*y}px)`

    transformations[1].style.transform = `rotateX(${-12*y+2}deg)
                                          rotateY(${-12*x}deg)
                                          rotateZ(${-z/2}deg)
                                          translateX(${-160*x}px)
                                          translateY(${-80*y}px)`

    transformations[2].style.transform = `rotateX(${-16*y+4}deg)
                                          rotateY(${-16*x}deg)
                                          rotateZ(${-z/2}deg)
                                          translateX(${-180*x}px)
                                          translateY(${-120*y}px)`

    transformations[3].style.transform = `translateX(${-72*x}px)
                                          translateY(${(-64*y)}px)`
}

let pan =(event)=>
{
    if (tilting) return false

    transform(document.body.style.zoom * (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2),
              document.body.style.zoom * (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2),
              document.body.style.zoom * (event.clientX - (window.innerWidth / 2)) / (window.innerWidth / 2) +
              (event.clientY - (window.innerHeight / 2)) / (window.innerHeight / 2))
}

let tilt =(event)=>
{
    tilting++

    let alpha = (event.alpha + 180) % 360
    let beta = event.beta + 180
    let gamma = (event.gamma + 90) * 2

    alpha = (alpha-180) / 180
    beta = (beta-180) / 180
    gamma = (gamma-180) / 180

    console.log(alpha, beta, gamma)

    alpha /= document.body.style.zoom
    beta /= document.body.style.zoom
    gamma /= document.body.style.zoom

    transform(alpha, beta, gamma)
}

let zoom =()=>
{
    document.body.style.zoom = Math.min(1.5,
                                        (window.innerWidth + 120) / 1920,
                                        (window.innerHeight + 40) / 1080)
}

let load =()=>
{
    $('#me img').onload =()=>
    {
        $('#me img').onload = undefined
        $('#me img').setAttribute('src', 'img/me/4.png')
    }
    $('#me img').setAttribute('src', 'img/me/2.png')

    transformations[0] = $('.transform-0')
    transformations[1] = $('.transform-1')
    transformations[2] = $('.transform-2')
    transformations[3] = $('.transform-3')

    window.addEventListener('mousemove', pan)
    window.addEventListener('deviceorientation', tilt)
    window.addEventListener('resize', zoom)
}

window.addEventListener('load', load)

window.addEventListener('scroll', ()=>{}, false)

setInterval(()=>{ tilting = Math.max(0, tilting - 1) }, 64)

zoom()
