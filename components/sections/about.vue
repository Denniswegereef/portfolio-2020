<template>
  <section id="js-about" class="about">
    <p
      ref="intro"
      class="subheading about__intro"
      data-scroll
      data-scroll-offset="100px 0"
      data-scroll-call="about_intro_animation">
      {{ content.intro }}
    </p>
    <div class="about__image-container" data-scroll data-scroll-speed="1.5">
      <img ref="image" class="about__image" src="~/static/images/portrait.png" alt="portrait image">
      <div ref="cover" class="about__image-cover" />
    </div>
    <div
      ref="body_container"
      class="paragraph about__body-container"
      data-scroll
      data-scroll-offset="100px 0"
      data-scroll-call="about_body_animation">
      <p v-for="(item, index) in content.description" :key="index" ref="body" class="paragraph about__body">
        {{ item }}
      </p>
    </div>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import debounce from 'lodash.debounce'

import splitText from '~/helpers/splitText'
import wrapElements from '~/helpers/wrapElements'
// import sanatizeText from '~/helpers/sanatizeText'

const CLASS_NAME_SPLIT_CONTAINER = 'js-split-container-intro'
const CLASS_NAME_SPLIT_CHILD = 'js-split-child-intro'

export default {
  data () {
    return {
      content: {
        intro: '' + `${''} My name is Dennis Wegereef, a 24-year-old Dutch guy living in Amsterdam. Recently I received my bachelor's degree in Communication & Multimedia Design from the Amsterdam University of Applied Sciences. During my studies, I created digital concepts, experiences, and products in a user centered way. While working as an intern at Superhero Cheesecake and Matise I developed a passion for frontend development. Currently, I'm looking for a full-time job as a developer to work on great projects with inspiring people.`,
        description: [
          "So a little about me I'm an avid sneaker collector trying to get the most exclusive Nike Air Max 1s. My passion doesn't stop there, with two friends. We have a webshop called Outsole.nl, where we sell more collectible sneakers all around the world. I mostly helped to create and build the shop and the brand. Also, I helped to produce content for their social channels, including graphic work and photography.",
          "In the past few years, I've gained experience with and developed a great understanding of topics like accessibility, real-time connections, performance, AR, and progressive enhancement. I have some experience with OpenGL and WebGL through ThreeJs and I would love to expand my knowledge of this creative side of development."
        ]
      },
      offSetMobileImage: 30,
      timelines: {
        introEnter: gsap.timeline({ paused: true }),
        bodyEnter: gsap.timeline({ paused: true })
      },
      spanTagOpening: `<span class="${CLASS_NAME_SPLIT_CONTAINER}"><span class="${CLASS_NAME_SPLIT_CHILD}">`,
      spanTagClosing: '</span></span>',
      replaceRegex: [
        {
          string: /Outsole.nl(?!\.)/g,
          tag: '<a href="https://www.outsole.nl" class="button button-inline" target="_blank">Outsole.nl</a>'
        },
        {
          string: /Superhero Cheesecake(?!\.)/g,
          tag: '<a href="https://superherocheesecake.com/" class="button button-inline" target="_blank">Superhero Cheesecake</a>'
        },
        {
          string: /Matise(?!\.)/g,
          tag: '<a href="https://www.matise.nl/" class="button button-inline" target="_blank">Matise</a>'
        }
      ]
    }
  },

  mounted () {
    this._resizeScreen()

    this._setupEventListeners()
    this._setUpTimelines()
  },

  beforeDestroy () {
    window.removeEventListener('resize', this.$data.debounceResize)
  },

  methods: {
    _setupEventListeners () {
      this._resizeHandler()
    },

    _setUpTimelines () {
      const splitIntroContainerElements = document.querySelectorAll('.about__intro .' + CLASS_NAME_SPLIT_CONTAINER)
      const splitIntroChildElements = document.querySelectorAll('.about__intro .' + CLASS_NAME_SPLIT_CHILD)

      const splitBodyContainerElements = document.querySelectorAll('.about__body .' + CLASS_NAME_SPLIT_CONTAINER)
      const splitBodyChildElements = document.querySelectorAll('.about__body .' + CLASS_NAME_SPLIT_CHILD)

      wrapElements([...splitBodyChildElements, ...splitIntroChildElements], this.$data.replaceRegex)

      const tlIntro = this.$data.timelines.introEnter
      const tlBody = this.$data.timelines.bodyEnter

      gsap.set([...splitIntroContainerElements, ...splitBodyContainerElements], { overflow: 'hidden', display: 'block' })
      gsap.set([...splitIntroChildElements, ...splitBodyChildElements], { yPercent: 100, display: 'block' })
      gsap.set(this.$refs.image, { opacity: 0 })

      tlIntro.eventCallback('onComplete', this._timelineCompleteHandler, [tlIntro, this.$refs.intro])
      tlIntro.to(splitIntroChildElements, { duration: 1.3, yPercent: 0, ease: 'power4', stagger: 0.15 })

      tlBody.eventCallback('onComplete', this._timelineCompleteHandler, [tlBody, this.$refs.body])
      tlBody.to(splitBodyChildElements, { duration: 1.0, yPercent: 0, ease: 'power4', stagger: 0.1 })
      tlBody.to(this.$refs.cover, { duration: 0.8, scaleY: 1, ease: 'power4' }, 0.5)
      tlBody.set(this.$refs.cover, { transformOrigin: 'left top' }, 1.3)
      tlBody.set(this.$refs.image, { opacity: 1 }, 1.3)
      tlBody.to(this.$refs.cover, { duration: 0.8, scaleY: 0, ease: 'power4' }, 1.5)
    },

    _resizeScreen () {
      this._setCoverPhoto()
      this._splitText()
    },

    _setCoverPhoto () {
      const isNarrow = window.innerWidth < this.$parent.$data.breakpoint.regular + 1

      const imageHeight = this.$refs.image.getBoundingClientRect().height

      isNarrow ? gsap.set(this.$refs.body_container, { paddingBottom: imageHeight + this.$data.offSetMobileImage }) : gsap.set(this.$refs.body_container, { paddingBottom: 0 })
    },

    _splitText () {
      splitText(this.$refs.intro, this.$data.spanTagOpening, this.$data.spanTagClosing)
      for (let i = 0; i < this.$refs.body.length; i++) splitText(this.$refs.body[i], this.$data.spanTagOpening, this.$data.spanTagClosing)
    },

    _wrapAnchor (elementsToCheck) {
      for (let i = 0; i < elementsToCheck.length; i++) for (let j = 0; j < this.$data.replaceRegex.length; j++) elementsToCheck[i].innerHTML = elementsToCheck[i].innerHTML.replace(this.$data.replaceRegex[j].regex, this.$data.replaceRegex[j].tag)
    },

    startAnimateIntro () {
      this.$data.timelines.introEnter.play()
    },

    startAnimateBody () {
      this.$data.timelines.bodyEnter.play()
    },

    // Handlers

    _timelineCompleteHandler (tl, container) {
      // sanatizeText(container)
      tl.kill()
    },

    _resizeHandler () {
      this.$data.debounceResize = debounce(this._resizeScreen.bind(this), 250)
      window.addEventListener('resize', this.$data.debounceResize)
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  position: relative;
  display: flex;
  flex-wrap: wrap;

  width: g(10, 12);
  margin: 0 auto rem(250px);
}

.about__intro {
  width: 100%;

  margin-bottom: rem($narrow-spacing / 3)
}

.about__body {
  padding-bottom: rem($narrow-spacing / 4);
}

.about__image-container {
  display: inline-table;
  position: absolute;
  bottom: 0;

  overflow: hidden;

  width: 90%;
  padding: 0 5%;
}

.about__image {
  position: relative;
  width: 100%;
}

.about__image-cover {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  background: $color-black;

  transform: scaleY(0.0);
  transform-origin: left bottom;
}

@include mq-regular {
  .about {
    width: g(11, 12);

    padding: 0 0 rem($regular-spacing) 0;
    margin: 0 auto rem($regular-spacing / 3);
  }

  .about__intro {
    margin-bottom: rem($regular-spacing / 3)
  }

  .about__body {
    padding-bottom: rem($regular-spacing / 8);
  }

  .about__image-container {
    position: initial;

    width: g(4, 12);

    margin-left: 0;
    padding: 0;
  }

  .about__image {
    width: 100%;
    margin: 0;
  }

  .about__body-container {
    width: g(7, 12);
    padding-left: g(1, 12);
  }
}

a {
  color: red;

  &:hover {
    color: $color-primary;
  }
}

@include mq-wide {
  .about {
    width: 100%;
    max-width: rem($wide-container);

    padding: 0 g(1, 24) $wide-spacing;
    margin: 0 auto rem($wide-spacing / 3);
  }

  .about__intro {
    margin-bottom: rem($wide-spacing / 3)
  }

  .about__body {
    padding-bottom: rem($narrow-spacing / 4);
  }

  .about__image-container {
    width: g(3, 12);

    margin-left: g(1, 12);
    margin-top: rem(50px);
  }

  .about__body-container {
    width: g(8, 12);

    padding-left: g(1, 12)
  }
}
</style>
