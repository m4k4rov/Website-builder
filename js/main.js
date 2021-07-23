
//---------------------------------------------------Создание элемента с тегом, классом и атрибутами
const getElement = (tagName, classNames, attribs) => {  
	const element = document.createElement(tagName);
	if (classNames) {
		if (Array.isArray(classNames)) {
			element.classList.add(...classNames);
		} else {
			element.classList.add(classNames);
		}	
	}

	if (attribs) {
		for (const attrib in attribs ) {
			element[attrib]=attribs[attrib];
		}
	}

	return element
};
//------------------------------Создание блока Хедер
const createHeader=({title, header: {logo, menu, social}})=>{							
	const header=getElement('header');
	const container = getElement('div','container');
	const wrapper = getElement('div','header');
	
	if (logo) { 																												//Создание логотипа
		const logotip = getElement('img', 'logo', {
			src: logo,
			alt: 'Логотип ' + title});
		wrapper.append(logotip);
	}

	if (menu) {																												//Создание меню
		const nav_menu = getElement('nav', 'menu-list');
		const allMenuLink = menu.map(item=>{
			const menuLink = getElement('a','menu-link', {
				href: item.link,
				textContent: item.title,			
			});
			if (item.title.toLowerCase()=='трейлер') {
				menuLink.setAttribute('data-fancybox','');
			}
			return menuLink;
		})

		nav_menu.append(...allMenuLink);
		wrapper.append(nav_menu);
		
		const menuButton = getElement('button','menu-button');
		menuButton.addEventListener('click', function () {
			menuButton.classList.toggle('menu-button-active');
			wrapper.classList.toggle('header-active');
		});
		container.append(menuButton);
	}

	if (social) {																										//Создание ссылок на соц сети
		const socialWrapper = getElement('div','social');
		const allSocial = social.map(item => {
			const socialLink = getElement('a', 'social-link');
			socialLink.append(getElement('img',"",{
				src: item.image,
				alt: item.title}));
			socialLink.href = item.link;
			return socialLink;
		})
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);
	};

	header.append(container);
	container.append(wrapper);
	return header;
};
//------------------------------Создание блока Мэйн
const createMain = ({title, main: {genre, rating, description, trailer, slider}}) => { 
	const main = getElement('main');
	const container = getElement('div','container');
	main.append(container);
	const mainContent = getElement('div','main-content');
	container.append(mainContent);
	const content = getElement('div','content');
	mainContent.append(content);

	if (genre) {																							//Создание жанра
		const genreSpan = getElement('span', ['genre', 'animated', 'fadeInRight'], {textContent: genre});
		content.append(genreSpan);
	}

	if (rating) {																							//Создание рейтинга
		const ratingBlock = getElement('div',['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', 'rating-stars');
		const ratingNumber = getElement('div', 'rating-number', {textContent: `${rating}/10`});

		for (let i=0; i<10; i++) {
			const star = getElement('img', 'star', {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src: i < rating ? 'img/star.svg' : 'img/star-o.svg',
			});
			ratingStars.append(star)
		};

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}
	content.append(getElement('h1',
		['main-title', 'animated', 'fadeInRight'],
		{textContent: title}));

	if (description) {												//Создание описания
		content.append(getElement('p',
			['main-description', 'animated', 'fadeInRight'],
			{textContent: description}));
	}

	if (trailer) {													//Создание кнопок трейлера
		const youtubeLink = getElement('a',
			['button', 'animated', 'fadeInRight'],
			{
				href: trailer,
				textContent: 'Смотреть трейлер',
			});
		youtubeLink.setAttribute('data-fancybox','');
			
		const youtubeImgLink = getElement('a',
			'play',
			{
				href: trailer,
				ariaLabel: 'Смотреть трейлер',
			});
		youtubeImgLink.setAttribute('data-fancybox','');
		
		const iconPlay = getElement('img',
			'play-img',
			{
				src: 'img/play.svg',
				alt: 'Смотреть трейлер',
				ariaHidden: true,
		});

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		mainContent.append(youtubeImgLink);
		
	}

	if (slider) {																										//Создание слайдера
		const seriesBlock = getElement('div', 'series');
		const swiperContainer = getElement('div','swiper-container');
		const swiperWrapper = getElement('div','swiper-wrapper');
		const arrow = getElement('button', 'arrow');
		const allSlide = slider.map(item =>{
			const swiperSlide = getElement('div', 'swiper-slide');
			const card = getElement('figure','card');
			const cardImg = getElement('img','card-img',
				{
					src: item.img,
					alt: item.subtitle ? item.subtitle : '',
				});
			card.append(cardImg);	
			if (item.title || item.subtitle) {
				const cardDescription = getElement('figcaption', 'card-description');
				cardDescription.innerHTML=`
					${item.subtitle ? `<p class="card-subtitle">${item.subtitle}</p>` : ''}
					${item.title ? `<p class="card-title">${item.title}</p>` : ''}
        `;
				card.append(cardDescription);
			}

				swiperSlide.append(card);
				return swiperSlide;
		});
		
		seriesBlock.append(swiperContainer, arrow);
		swiperContainer.append(swiperWrapper);
		swiperWrapper.append(...allSlide);
		container.append(seriesBlock);
		
		new Swiper(swiperContainer, {
			loop: true,
			navigation: {
				nextEl: arrow,
			},
			breakpoints: {
				320: {
					slidesPerView: 1,
					spaceBetween: 20
				},
				541: {
					slidesPerView: 2,
					spaceBetween: 40
				}
			}
		});
	}

	return main;
};
//--------------------------Конечная функция создания сайта
const movieConstructor = (selector, options)=> {  				
	const app = document.querySelector(selector);
	app.classList.add('body-app');

	app.style.color = options.fontColor || '';
	app.style.backgroundColor = options.backgroundColor || '';
	if (options.subColor) document.documentElement.style.setProperty('--sub-color', options.subColor);

	app.style.backgroundImage = options.background ? 
		`url("${options.background}")` : '';
	document.title=options.title + ' - официальный сайт';
	if (options.favicon) {
		const type = options.favicon.slice(-3);
		document.head.append(getElement('link',
			'',
			{
				rel: 'icon',
				type: type === 'svg' ? 'svg-xml' : 'image/png',
				href: options.favicon,
			}));
	}

	if (options.header) {
		app.append(createHeader(options));
	}

	if (options.main) {
		app.append(createMain(options));
	}
};

movieConstructor('body', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	favicon: 'witcher/logo.png',
	fontColor: '#fff',
	backgroundColor: '#141218',
	subColor: '#9D2929',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title:'Twitter',
				link:'https://twitter.com',
				image:'witcher/social/twitter.svg',
			},
			{
				title:'Instagram',
				link:'https://instagram.com',
				image:'witcher/social/instagram.svg',
			},
			{
				title:'Facebook',
				link:'https://facebook.com',
				image:'witcher/social/facebook.svg',
			}
		],
		menu: [
			{
				title:'Описание',
				link:'#',
		},
			{
				title:'Трейлер',
				link:'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		},
			{
				title:'Отзывы',
				link:'#',
		},
		]
	},
	main: {
		genre: '2019, фэнтези',
		rating: '7',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечисти — хоть от чудищ болотных, оборотней и даже	заколдованных принцесс.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
		slider: [
			{
				img: 'witcher/series/series-1.jpg',
				title: 'Начало конца',
				subtitle: 'Серия №1'
			},
			{
				img: 'witcher/series/series-2.jpg',
				title: 'Четыре марки',
				subtitle: 'Серия №2'
			},
			{
				img: 'witcher/series/series-3.jpg',
				title: 'Предательская луна',
				subtitle: 'Серия №3'
			},
			{
				img: 'witcher/series/series-4.jpg',
				title: 'Банкеты, ублюдки и похороны',
				subtitle: 'Серия №4'
			}
		]
	}
});

/*fetch('./site.json')
.then(response => response.json())
.then(site => movieConstructor('.app', site));
*/