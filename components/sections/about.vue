<template>
  <section class="about" id="js-about">
    <p
      class="subheading about__intro"
      ref="intro"
      data-scroll
      data-scroll-offset="100px 0"
      data-scroll-call="about_intro_animation">
      {{ content.intro }}
    </p>
    <div class="about__image-container" data-scroll data-scroll-speed="1.5">
      <img class="about__image" src="~/static/images/portrait_test.png" alt="portrait image" ref="image">
      <div class="about__image-cover" ref="cover"/>
    </div>
    <p
      class="paragraph about__body"
      ref="body"
      data-scroll
      data-scroll-offset="100px 0"
      data-scroll-call="about_body_animation">
      {{ content.body }}
      {{ content.body }}
      {{ content.body }}
    </p>
  </section>
</template>

<script>
import { gsap } from 'gsap'
import debounce from 'lodash.debounce'

import splitText from '~/helpers/splitText'
// import sanatizeText from '~/helpers/sanatizeText'

const CLASS_NAME_SPLIT_CONTAINER = 'js-split-container-intro'
const CLASS_NAME_SPLIT_CHILD = 'js-split-child-intro'

export default {
  data () {
    return {
      content: {
        intro: '' + `${''} My name is Dennis Wegereef 24-year-old dutch guy, and I am living in Amsterdam. I'm a student at the University of Applied Sciences Amsterdam, studying Communication Multimedia Design. The study is focusing on concepts, user experience, and creating digital products while keeping the end-user in mind. Confidently in 9 days, I graduate there with my thesis I've worked on for the past 6 months.  So a little about me, I'm an avid sneaker collector trying to get the most exclusive Nike Air Max 1s. But my passion doesn't stop there, together with two friends we have a webshop called Outsole.nl.`,
        body: '' + `${''} At the moment, I've just finished my thesis working on a platform where I did the visual and user experience design. But my passion and interest will be at frontend development. During my study, I've had 2 internships, both in Amsterdam, and a minor Web Development at the University of Applied Sciences, where I learned a lot throughout the way. The first internship was at Matise, and the second at Superhero Cheesecake, where I worked as a creative developer.`
      },
      offSetMobileImage: 30,
      timelines: {
        introEnter: gsap.timeline({ paused: true }),
        bodyEnter: gsap.timeline({ paused: true })
      },
      spanTagOpening: `<span class="${CLASS_NAME_SPLIT_CONTAINER}"><span class="${CLASS_NAME_SPLIT_CHILD}">`,
      spanTagClosing: '</span></span>'
    }
  },

  mounted () {
    this._resizeScreen()

    this._setupEventListeners()
    this._setUpTimelines()
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
      console.log(window.innerWidth, this.$parent.$data.breakpoint.regular)
      const isNarrow = window.innerWidth < this.$parent.$data.breakpoint.regular + 1

      const imageHeight = this.$refs.image.getBoundingClientRect().height

      isNarrow ? gsap.set(this.$refs.body, { paddingBottom: imageHeight + this.$data.offSetMobileImage }) : gsap.set(this.$refs.body, { paddingBottom: 0 })
    },

    _splitText () {
      splitText(this.$refs.intro, this.$data.spanTagOpening, this.$data.spanTagClosing)
      splitText(this.$refs.body, this.$data.spanTagOpening, this.$data.spanTagClosing)
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
      window.addEventListener('resize', debounce(this._resizeScreen.bind(this), 20))
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

.about__image-container {
  display: inline-table;
  position: absolute;
  bottom: 0;

  overflow: hidden;

  width: 100%;
}

.about__image {
  position: relative;
  width: 80%;
  margin-left: 10%;
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

  .about__image-container {
    position: initial;

    width: g(4, 12);
  }

  .about__image {
    width: 100%;
    margin: 0;
  }

  .about__body {
    width: g(7, 12);
    padding-left: g(1, 12);
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

  .about__image-container {
    width: g(3, 12);

    margin-left: g(1, 12);
    margin-top: rem(100px);
  }

  .about__body {
    width: g(8, 12);

    padding-left: g(1, 12)
  }
}
</style>
