/**
 * To review the configuration of this file, as well as add or delete properties,
 * consult the following link.
 *
 * @see https://stylelint.io/user-guide/configure
 */
module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-order'],
  // Stylelint ignores the node_modules directory by default. However, this is overridden if ignoreFiles is set.
  ignoreFiles: [
    'node_modules/**/*.css',
    'node_modules/**/*.scss',
    'node_modules/**/*.sass',
    'coverage/**/*.css',
    'coverage/**/*.scss',
    'coverage/**/*.sass',
    'build/**/*.css',
    'build/**/*.scss',
    'build/**/*.sass',
    'public/**/*.css',
    'public/**/*.scss',
    'public/**/*.sass'
  ],
  rules: {
    'order/order': [
      {
        type: 'at-rule',
        name: 'extend'
      },
      {
        type: 'at-rule',
        name: 'extend',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'square'
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'pad-x'
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'pad-y'
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'mar-x'
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'mar-y'
      },
      {
        type: 'at-rule',
        name: 'include'
      },
      {
        type: 'at-rule',
        name: 'include',
        hasBlock: true
      },
      'custom-properties',
      'dollar-variables',
      'declarations',
      {
        type: 'at-rule',
        name: 'keyframes'
      },
      {
        type: 'at-rule',
        name: 'keyframes',
        hasBlock: true
      },
      'rules',
      {
        type: 'rule',
        selector: '&::before'
      },
      {
        type: 'rule',
        selector: '&::after'
      },
      {
        type: 'rule',
        selector: '&:hover'
      },
      {
        type: 'rule',
        selector: '&:hover::before'
      },
      {
        type: 'rule',
        selector: '&:hover::after'
      },
      {
        type: 'rule',
        selector: '&:focus'
      },
      {
        type: 'rule',
        selector: '&:focus::before'
      },
      {
        type: 'rule',
        selector: '&:focus::after'
      },
      {
        type: 'rule',
        selector: '&:active'
      },
      {
        type: 'rule',
        selector: '&:active::before'
      },
      {
        type: 'rule',
        selector: '&:active::after'
      },
      {
        type: 'rule',
        selector: '&:'
      },
      {
        type: 'rule',
        selector: '&--'
      },
      {
        type: 'rule',
        selector: '&__'
      },
      {
        type: 'at-rule',
        name: 'media'
      },
      {
        type: 'at-rule',
        name: 'media',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'xs',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'sm',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'md',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'lg',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'xl',
        hasBlock: true
      },
      {
        type: 'at-rule',
        name: 'include',
        parameter: 'xx',
        hasBlock: true
      }
    ],
    'order/properties-order': [
      [
        'content',
        {
          groupName: 'positions',
          noEmptyLineBetween: true,
          properties: ['position', 'top', 'right', 'bottom', 'left', 'z-index']
        },
        {
          groupName: 'displays',
          noEmptyLineBetween: true,
          properties: [
            'display',
            'flex-direction',
            'flex-wrap',
            'flex-flow',
            'flex-grow',
            'flex-basis',
            'flex-shrink',
            'justify-content',
            'justify-items',
            'justify-self',
            'align-content',
            'align-items',
            'align-self',
            'grid-template-rows',
            'grid-template-columns',
            'grid-template-areas',
            'grid-template',
            'grid-auto-rows',
            'grid-auto-columns',
            'grid-auto-flow',
            'grid',
            'grid-area',
            'grid-row',
            'grid-column',
            'grid-row-start',
            'grid-row-end',
            'grid-column-start',
            'grid-column-end',
            'row-gap',
            'column-gap',
            'gap'
          ]
        },
        {
          groupName: 'dimensions',
          noEmptyLineBetween: true,
          properties: [
            'width',
            'height',
            'min-width',
            'min-height',
            'max-width',
            'max-height',
            'padding',
            'padding-top',
            'padding-right',
            'padding-bottom',
            'padding-left',
            'margin',
            'margin-top',
            'margin-right',
            'margin-bottom',
            'margin-left'
          ]
        },
        {
          groupName: 'fonts',
          noEmptyLineBetween: true,
          properties: [
            'font-family',
            'font-weight',
            'font-size',
            'font-style',
            'line-heigh',
            'color',
            'text-align',
            'text-align-last',
            'text-overflow',
            'text-shadow',
            'text-transform',
            'text-decoration',
            'text-decoration-line',
            'text-decoration-color',
            'text-decoration-style',
            'text-decoration-skip',
            'word-break',
            'word-spacing',
            'word-wrap'
          ]
        },
        {
          groupName: 'borders',
          noEmptyLineBetween: true,
          properties: [
            'border',
            'border-width',
            'border-style',
            'border-color',
            'border-top',
            'border-right',
            'border-bottom',
            'border-left',
            'border-top-width',
            'border-top-style',
            'border-top-color',
            'border-top-right-radius',
            'border-top-left-radius',
            'border-right-width',
            'border-right-style',
            'border-right-color',
            'border-bottom-width',
            'border-bottom-style',
            'border-bottom-color',
            'border-bottom-right-radius',
            'border-bottom-left-radius',
            'border-left-width',
            'border-left-style',
            'border-left-color',
            'border-radius',
            'border-spacing',
            'border-collapse'
          ]
        },
        {
          groupName: 'visibility',
          noEmptyLineBetween: true,
          properties: [
            'visibility',
            'opacity',
            'overflow',
            'overflow-x',
            'overflow-y',
            'overflow-wrap'
          ]
        },
        'cursor',
        'object-fit',
        'object-position',
        'outline',
        'box-sizing',
        'fill',
        {
          groupName: 'backgrounds',
          noEmptyLineBetween: true,
          properties: [
            'background',
            'background-color',
            'background-image',
            'background-repeat',
            'background-size',
            'background-clip',
            'background-attachment',
            'background-origin',
            'background-position',
            'background-position-x',
            'background-position-y',
            'background-blend-mode'
          ]
        },
        {
          groupName: 'transforms',
          noEmptyLineBetween: true,
          properties: ['transform-origin', 'transform']
        },
        {
          groupName: 'transitions',
          noEmptyLineBetween: true,
          properties: [
            'transition',
            'transition-duration',
            'transition-delay',
            'transition-property'
          ]
        },
        {
          groupName: 'animations',
          noEmptyLineBetween: true,
          properties: [
            'animation',
            'animation-name',
            'animation-duration',
            'animation-delay',
            'animation-fill-mode',
            'animation-direction',
            'animation-timing-function',
            'animation-iteration-count',
            'animation-play-state'
          ]
        }
      ],
      { unspecified: 'bottom' }
    ],
    indentation: [2, { baseIndentLevel: 1 }],
    'max-nesting-depth': [
      3,
      { ignore: ['blockless-at-rules', 'pseudo-classes'] }
    ],
    'property-no-vendor-prefix': [true, { ignoreProperties: ['appearance'] }],
    'selector-no-qualifying-type': [true, { ignore: ['attribute'] }],
    'declaration-colon-newline-after': 'always-multi-line'
  }
};
