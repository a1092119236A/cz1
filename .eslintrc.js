module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:vue/essential"
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "globals": {
        Cesium: 'readonly',
        defineProps: 'readonly',
        main: 'writable',
    }, "plugins": [
        "vue"
    ],
    "rules": {
    }
}
