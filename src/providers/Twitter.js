const Provider = require('./Provider');
const fetch = require('node-fetch');
const _ = require('lodash');

class Twitter extends Provider {
    constructor(options) {
        super(options)
        this.regexp = /https:\/\/twitter.com\/.*\/.*\/([0-9]+)/i;
        this.idPosition = 1;
        this.options = _.defaults({
            hideThread: false,
            hideMedia: false,
            align: '',
            theme: '',
            linkColor: '',
            widgetType: '',
            dnt: true,
            omitScript: true
        }, options);
    }

    async getEmbedData(embedLink) {
        const embedOptions = {
            url: embedLink,
            hide_thread: this.options.hideThread !== false ? '1' : '0',
            align: this.options.align || '',
            hide_media: this.options.hideMedia !== false ? '1' : '0',
            theme: this.options.theme || '',
            link_color: this.options.linkColor || '',
            widget_type: this.options.widgetType || '',
            omit_script: this.options.omit_script,
            dnt: this.options.dnt,
            limit: 20,
            chrome: 'nofooter'
        }
        const params = Object.entries(embedOptions).map(([key, val]) => `${key}=${val}`).join('&')
        const apiUrl = `https://publish.twitter.com/oembed?${params}`

        const response = await fetch(apiUrl)
        const embedData = await response.json()
        return embedData.html
    }
}

module.exports = Twitter;