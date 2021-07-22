/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
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
*/

const getElement = (tagName, classNames, attribs) => {  //Создание элемента с тегом, классом и атрибутами
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

const createHeader=({title, header: {logo, menu, social}})=>{							// Создание хедера
	const header=getElement('header');
	const container = getElement('div','container');
	const wrapper = getElement('div','header');
	const menuButton = getElement('button','menu-button');
	
	menuButton.addEventListener('click', function () {
		menuButton.classList.toggle('menu-button-active');
		wrapper.classList.toggle('header-active');
	})

	if (logo) { 							//Создание логотипа
		const logotip = getElement('img', 'logo', {
			src: logo,
			alt: 'Логотип ' + title});
		wrapper.append(logotip);
	}

	if (menu) {								//Создание меню
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
	}

	if (social) {									//Создание ссылок на соц сети
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
	container.append(menuButton);
	return header;
};

const createMain = ({title, main: {genre, rating, description, trailer}}) => {      //Создание блока Мэйн
	
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
			})

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		mainContent.append(youtubeImgLink);
		
	}

	return main;
};

const movieConstructor = (selector, options)=> {  				//Конечная функция создания сайта
	const app = document.querySelector(selector);
	app.classList.add('body-app');
	app.style.backgroundImage = options.background ? 
		`url("${options.background}")` : '';
	document.title=options.title + ' - официальный сайт';
	document.head.append(getElement('link',
		'',
		{
			rel: 'icon',
			type: 'image/png',
			href: options.header.logo,
		}));
	if (options.header) {
		app.append(createHeader(options));
	}
	if (options.main) {
		app.append(createMain(options));
	}
};

movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
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
	}
});

/*fetch('./site.json')
.then(response => response.json())
.then(site => movieConstructor('.app', site));
*/