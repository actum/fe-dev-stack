import './styles/main.scss'

import 'babel-polyfill'
import SmoothScroll from 'smoothscroll-polyfill'

import renderFeature from './lib/dev/renderFeature'

// Add Smoothscroll polyfill
SmoothScroll.polyfill()

// Add global config
const config = window.JS_FEATURES_CONFIG

// Import features
import Example from './features/Example'

renderFeature(Example, 'exampleContainer', 'example', {
  props: { config: config.example },
})
