const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange,
	WA_MESSAGE_STUB_TYPES,
	mentionedJid
} = require("@adiwajshing/baileys")
const imageToBase64 = require('image-to-base64')
const moment = require("moment-timezone")
const speed = require('performance-now')
const base64Img = require('base64-img')
const imgbb = require('imgbb-uploader')
const brainly = require('brainly-scraper')
const ffmpeg = require('fluent-ffmpeg')
const { exec } = require("child_process")
const fetch = require('node-fetch')
const ms = require('parse-ms')
const crypto = require('crypto')
const axios = require('axios')
const cheerio = require('cheerio')
const FormData = require('form-data')
const toMs = require('ms')
const fs = require("fs")
const PhoneNumber = require('awesome-phonenumber')
const googleImage = require('g-i-s')
const yts = require('yt-search')
const { 
  y2mateA,
  y2mateV
} = require('./lib/ytdl.js')
const {
  fbDown 
} = require('./lib/fbdl.js')
const { fromBuffer } = require('file-type')
const { fetchJson } = require('./lib/fetcher')
const { nad } = require('./language')
const time = moment().tz('Asia/Jakarta').format("HH:mm:ss")
const a = '```'
const {
	color,
	bgcolor
} = require('./lib/color')
const {
	getBuffer,
	getGroupAdmins,
	getRandom,
	banner,
	start,
	info,
	success,
	close
} = require('./lib/functions')
const { isTicTacToe, getPosTic, KeisiSemua, cekIsi, cekTicTac } = require('./lib/tictactoe')
const tictac = require('./lib/tictac')
// DATA GAME
let tictactoe = []
//Load Json
const mengsetting = JSON.parse(fs.readFileSync('./settings/Setting.json'))
const {
	botName,
	ownerName,
	ownerNumbers,
	ZeksApi,
	botPrefix,
	GrupLimitz,
	autor,
	peknem,
	CeerTod
} = mengsetting
prefix = botPrefix
blocked = []
memberlimit = GrupLimitz
cr = CeerTod
const ownerNumber = `${ownerNumbers}@s.whatsapp.net`
const vcard = 'BEGIN:VCARD\n'
	+ 'VERSION:3.0\n'
	+ `FN:${ownerName}\n`
	+ `ORG:${botName};\n`
	+ `TEL;type=CELL;type=VOICE;waid=${ownerNumbers}:${PhoneNumber('+' + ownerNumbers).getNumber('international')}\n`
	+ 'END:VCARD'
// APIKEY
const keybb = '6d3163b18cbf1d519aa8abfb0c58f31f'
const zeksapi = ZeksApi
// APIKEY
const _registered = JSON.parse(fs.readFileSync('./database/registered.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/leveling.json'))
const premium = JSON.parse(fs.readFileSync('./database/premium.json'))
const welkom = JSON.parse(fs.readFileSync('./database/welkom.json'))
const antilink = JSON.parse(fs.readFileSync('./database/antilink.json'))
const bad = JSON.parse(fs.readFileSync('./database/bad.json'))
const badword = JSON.parse(fs.readFileSync('./database/badword.json'))
const event = JSON.parse(fs.readFileSync('./database/event.json'))
const ban = JSON.parse(fs.readFileSync('./database/banned.json'))
const _level = JSON.parse(fs.readFileSync('./database/level.json'))
const _afk = JSON.parse(fs.readFileSync('./database/afk.json'))
const audioya = JSON.parse(fs.readFileSync('./media/audio.json'))
const imegya = JSON.parse(fs.readFileSync('./media/image.json'))
const setimker = JSON.parse(fs.readFileSync('./media/stik.json'))
const vidioya = JSON.parse(fs.readFileSync('./media/video.json'))
const tebakgambar = JSON.parse(fs.readFileSync('./database/tebakgambar.json'))
const caklontong = JSON.parse(fs.readFileSync('./database/caklontong.json'))
const family = JSON.parse(fs.readFileSync('./database/family100.json'))
const tebakanime = JSON.parse(fs.readFileSync('./database/tebakanime.json'))
const nsfw = JSON.parse(fs.readFileSync('./database/nsfw.json'))

// End Json
const getLevelingXp = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].xp
	}
}

const getLevelingLevel = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].level
	}
}

const getLevelingId = (sender) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		return _level[position].id
	}
}

const addLevelingXp = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].xp += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingLevel = (sender, amount) => {
	let position = false
	Object.keys(_level).forEach((i) => {
		if (_level[i].id === sender) {
			position = i
		}
	})
	if (position !== false) {
		_level[position].level += amount
		fs.writeFileSync('./database/level.json', JSON.stringify(_level))
	}
}

const addLevelingId = (sender) => {
	const obj = { id: sender, xp: 1, level: 1 }
	_level.push(obj)
	fs.writeFileSync('./database/level.json', JSON.stringify(_level))
}

const getRegisteredRandomId = () => {
	return _registered[Math.floor(Math.random() * _registered.length)].id
}

const addRegisteredUser = (userid, sender, time, serials) => {
	const obj = { id: userid, name: sender, time: time, serial: serials }
	_registered.push(obj)
	fs.writeFileSync('./database/registered.json', JSON.stringify(_registered))
}

const createSerial = (size) => {
	return crypto.randomBytes(size).toString('hex').slice(0, size)
}

const checkRegisteredUser = (sender) => {
	let status = false
	Object.keys(_registered).forEach((i) => {
		if (_registered[i].id === sender) {
			status = true
		}
	})
	return status
}
// AFK BOCHI BOT
/**
 * Add AFK.
 * @param {String} userId 
 * @param {String} time 
 * @param {String} reason 
 * @param {Object} _dir 
 */
const addAfkUser = (userId, time, reason, _dir) => {
	const obj = { id: userId, time: time, reason: reason }
	_dir.push(obj)
	fs.writeFileSync('./database/afk.json', JSON.stringify(_dir))
}

/**
 * Check user AFK.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Boolean}
 */
const checkAfkUser = (userId, _dir) => {
	let status = false
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			status = true
		}
	})
	return status
}

/**
 * Get AFK reason.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkReason = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].reason
	}
}
/**
 * Get AFK time.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkTime = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].time
	}
}

/**
 * Get AFK ID.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {String}
 */
const getAfkId = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	if (position !== null) {
		return _dir[position].id
	}
}

/**
 * Get AFK position.
 * @param {String} userId 
 * @param {Object} _dir 
 * @returns {Number}
 */
const getAfkPosition = (userId, _dir) => {
	let position = null
	Object.keys(_dir).forEach((i) => {
		if (_dir[i].id === userId) {
			position = i
		}
	})
	return position
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);
	return `${pad(hours)} H ${pad(minutes)} M ${pad(seconds)} S`
}
// FUNCTION Metadata sticker
function addMetadata(packname, author) {
    if (!packname) packname = `${peknem}`; if (!author) author = ` ${autor}`;
    author = author.replace(/[^a-zA-Z0-9]/g, '');
    //let name = `data`

    if (fs.existsSync(`./sticker/data.exif`)) {
        return `./sticker/data.exif`
    }
    const json = {
        "sticker-pack-name": packname,
        "sticker-pack-publisher": author,
    }

    const littleEndian = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
    const bytes = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]

    let len = JSON.stringify(json).length
    let last

    if (len > 256) {
        len = len - 256
        bytes.unshift(0x01)
    } else {
        bytes.unshift(0x00)
    }

    if (len < 16) {
        last = len.toString(16)
        last = "0" + len
    } else {
        last = len.toString(16)
    }

    const buf2 = Buffer.from(last, "hex")
    const buf3 = Buffer.from(bytes)
    const buf4 = Buffer.from(JSON.stringify(json))

    const buffer = Buffer.concat([littleEndian, buf2, buf3, buf4])

    fs.writeFile(`./sticker/data.exif`, buffer, (err) => {
        return `./sticker/data.exif`
    }
    )
}
// MONOSPACE
function monospace(string) {
            return '```' + string + '```'
        }
// SLEEP 
const sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function starts() {
	const alfa = new WAConnection()
	alfa.version = [2, 2119, 6]
	alfa.logger.level = 'warn'
	alfa.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color('Scan BosQue'))
	})
	alfa.on('credentials-updated', () => {
		fs.writeFileSync('./mz.json', JSON.stringify(alfa.base64EncodedAuthInfo(), null, '\t'))
		info('2', 'Login Ke Hati Dia')
	})
	fs.existsSync('./mz.json') && alfa.loadAuthInfo('./mz.json')
	alfa.on('connecting', () => {
		start('2', 'Sedang Masuk...')
	})
	alfa.on('open', () => {
		success('2', 'Berhasil Masuk')
	})
	await alfa.connect({ timeoutMs: 30 * 1000 })

alfa.on('group-participants-update', async (anu) => {
	if (!welkom.includes(anu.jid)) return
	try {
		const mdata = await alfa.groupMetadata(anu.jid)
		console.log(anu)
		if (anu.action == 'add') {
			num = anu.participants[0]
			ini_user = alfa.contacts[num]
			welkam = `Hai ${ini_user.notify}\n◪ Welcome in group:\n├─ ${mdata.subject}\n│\n├─ Intro dulu\n├─ ❏ Nama: \n├─ ❏ Umur: \n├─ ❏ Asal kota: \n├─ ❏ Kelas: \n├─ ❏ Jenis kelamin: \n└─ ❏ Nomor: ${num.replace('@s.whatsapp.net', '')}\nSemoga Betah yaa~~`
			const moment = require('moment-timezone')
            const jm = moment.tz('Asia/Jakarta').format('HH:mm:ss')
			let d = new Date
				let locale = 'id'
					let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
					let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
					let week = d.toLocaleDateString(locale, { weekday: 'long' })
					let calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
				})
				try {
pushnem = alfa.contacts[num] != undefined ? alfa.contacts[num].notify = undefined ? PhoneNumber('+' + num.replace('@s.whatsapp.net', '')).getNumber('international') : alfa.contacts[num].notify || alfa.contacts[num].vname : PhoneNumber('+' + num.replace('@s.whatsapp.net', '')).getNumber('international')
} catch { 
 pushnem = num.split('@')[0]
}
			try {
				ppimg = await alfa.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
			} catch {
				ppimg = './src/200.jpg'
			}
				exec(`magick './src/wel.jpg' -gravity west -fill '#000000' -font './src/font-gue.ttf' -size 1280x710 -pointsize 75 -interline-spacing 7.5 -annotate +460-45 '${pushnem}' -pointsize 35 -annotate +460+83 '${jm} ${calender}' -pointsize 50 -annotate +460+200 'Welcome To ${mdata.subject}' '${ppimg}' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -430+70 -composite 'hamsil.jpg'`)
				.on('error', () => reply('error'))
				.on('exit', () => {
			alfa.sendMessage(mdata.id, fs.readFileSync('hamsil.jpg'), MessageType.image, {caption: `${welkam}`, contextInfo: { mentionedJid: [num] }})
			})
			//leave
		} else if (anu.action == 'remove') {
		num = anu.participants[0]
		ini_user = alfa.contacts[num]
		out =`◪ Goodbye ${ini_user.notify}\n◪ Leave from group:\n${mdata.subject}\n│\n└─ ❏ Nomor: ${num.replace('@s.whatsapp.net', '')}\nGoodBye~~`
		const moment = require('moment-timezone')
        const jamny = moment.tz('Asia/Jakarta').format('HH:mm:ss')
         
			let d = new Date
				let locale = 'id'
					let gmt = new Date(0).getTime() - new Date('1 Januari 2021').getTime()
					let weton = ['Pahing', 'Pon','Wage','Kliwon','Legi'][Math.floor(((d * 1) + gmt) / 84600000) % 5]
					let week = d.toLocaleDateString(locale, { weekday: 'long' })
					let calender = d.toLocaleDateString(locale, {
				day: 'numeric',
				month: 'long',
				year: 'numeric'
				})
pushnem = alfa.contacts[num] != undefined ? alfa.contacts[num].notify = undefined ? PhoneNumber('+' + num.replace('@s.whatsapp.net', '')).getNumber('international') : alfa.contacts[num].notify || alfa.contacts[num].vname : PhoneNumber('+' + num.replace('@s.whatsapp.net', '')).getNumber('international')
			try {
				ppimg = await alfa.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
			} catch {
				ppimg = './src/200.jpg'
			}
				exec(`magick './src/lev.jpg' -gravity west -fill '#000000' -font './src/font-gue.ttf' -size 1280x710 -pointsize 70 -interline-spacing 7.5 -annotate +460-45 '${pushnem}' -pointsize 35 -annotate +460+83 '${jamny} ${calender}' -pointsize 50 -annotate +460+200 'Leaving from ${mdata.subject}' '${ppimg}' -resize %[fx:t?u.w*0.2:u.w]x%[fx:?u.h*0.2:u.h] -gravity center -geometry -430+70 -composite 'hamsil.jpg'`)
				.on('error', () => reply('error'))
				.on('exit', () => {
			alfa.sendMessage(mdata.id, fs.readFileSync('hamsil.jpg'), MessageType.image, {caption: out, contextInfo: { mentionedJid: [num] }})
			})
		}
	} catch (e) {
		console.log(e)
	}
	})

	alfa.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
		for (let i of json[1].blocklist) {
			blocked.push(i.replace('c.us', 's.whatsapp.net'))
		}
	})
// AUTO BLOCK
alfa.on('CB:action,,call', async json => {
    const callerId = json[2][0][1].from;
    console.log("Telpon dari "+ callerId)
        alfa.sendMessage(callerId, `Bot tidak menerima panggilan. Karena kamu telah melanggar rules, maka kamu telah diblok, Owner tidak bertanggung jawab`, MessageType.text)
        await sleep(4000)
        await alfa.blockUser(callerId, "add") // Block user
})
	alfa.on('message-update', async (geps) => {
		try {
			const from = geps.key.remoteJid
			const messageStubType = WA_MESSAGE_STUB_TYPES[geps.messageStubType] || 'MESSAGE'
			const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
			const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
			const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
			let sender = geps.key.fromMe ? alfa.user.jid : geps.key.remoteJid.endsWith('@g.us') ? geps.participant : geps.key.remoteJid
			const isRevoke = geps.key.remoteJid.endsWith('@s.whatsapp.net') ? true : geps.key.remoteJid.endsWith('@g.us') ? dataRevoke.includes(from) : false
			const isCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : dataCtRevoke.data ? true : false
			const isBanCtRevoke = geps.key.remoteJid.endsWith('@g.us') ? true : !dataBanCtRevoke.includes(sender) ? true : false
			const numbernye = ["0"]
			if (messageStubType == 'REVOKE') {
				console.log(`Status untuk grup : ${!isRevoke ? 'On' : 'Off'}\nStatus semua kontak : ${!isCtRevoke ? 'On' : 'Off'}\nStatus kontak dikecualikan : ${!isBanCtRevoke ? 'On' : 'Off'}`)
				if (!isRevoke) return
				if (!isCtRevoke) return
				if (!isBanCtRevoke) return
				const from = geps.key.remoteJid
				const isGroup = geps.key.remoteJid.endsWith('@g.us') ? true : false
				let int
				let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
				const id_deleted = geps.key.id
				const conts = geps.key.fromMe ? alfa.user.jid : alfa.contacts[sender] || { notify: jid.replace(/@.+/, '') }
				const pushname2 = geps.key.fromMe ? alfa.user.name : conts.notify || conts.vname || conts.name || '-'
				const opt4tag = {
					contextInfo: { mentionedJid: [sender] }
				}
				for (let i = 0; i < infoMSG.length; i++) {
					if (infoMSG[i].key.id == id_deleted) {
						const dataInfo = infoMSG[i]
						const type = Object.keys(infoMSG[i].message)[0]
						const timestamp = infoMSG[i].messageTimestamp
						int = {
							no: i,
							type: type,
							timestamp: timestamp,
							data: dataInfo
						}
					}
				}
				const index = Number(int.no)
				const body = int.type == 'conversation' ? infoMSG[index].message.conversation : int.type == 'extendedTextMessage' ? infoMSG[index].message.extendedTextMessage.text : int.type == 'imageMessage' ? infoMSG[index].message.imageMessage.caption : int.type == 'stickerMessage' ? 'Sticker' : int.type == 'audioMessage' ? 'Audio' : int.type == 'videoMessage' ? infoMSG[index].videoMessage.caption : infoMSG[index]
				const mediaData = int.type === 'extendedTextMessage' ? JSON.parse(JSON.stringify(int.data).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : int.data
				var itsme = `${numbernye}@s.whatsapp.net`
				var split = `${cr}`
				// var taged = Lan.message.extendedTextMessage.contextInfo.mentionedJid[0]
				var selepbot72 = {
					contextInfo: {
						participant: itsme,
						quotedMessage: {
							extendedTextMessage: {
								text: split,
							}
						}
					}
				}
				if (int.type == 'conversation' || int.type == 'extendedTextMessage') {
					const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Text
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
					alfa.sendMessage(from, strConversation, MessageType.text, selepbot72)
				} else if (int.type == 'stickerMessage') {
					var itsme = `${numbernye}@s.whatsapp.net`
					var split = `${cr}`
					const pingbro23 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					const filenamesticker = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
					const savedFilenamesticker = await alfa.downloadAndSaveMediaMessage(int.data, `./media/sticker/${filenamesticker}`);
					const strConversationsticker = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Sticker
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
`

					const buff = fs.readFileSync(savedFilenamesticker)
					alfa.sendMessage(from, strConversationsticker, MessageType.text, opt4tag)
					alfa.sendMessage(from, buff, MessageType.sticker, pingbro23)
					fs.unlinkSync(savedFilenamesticker)

				} else if (int.type == 'imageMessage') {
					var itsme = `${numbernye}@s.whatsapp.net`
					var split = `${cr}`
					const pingbro22 = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					const filename = `${sender.replace('@s.whatsapp.net', '')}-${moment().unix()}`
					const savedFilename = await alfa.downloadAndSaveMediaMessage(int.data, `./media/image/${filename}`);
					const buff = fs.readFileSync(savedFilename)
					const strConversation = `「 *ANTI-DELETE* 」

• Nama: ${pushname2}
• Number: @${sender.replace('@s.whatsapp.net', '')}
• Tipe: Image
• Waktu: ${moment.unix(int.timestamp).format('HH:mm:ss DD/MM/YYYY')}
• Pesan: ${body ? body : '-'}
`
					alfa.sendMessage(from, buff, MessageType.image, { contextInfo: { mentionedJid: [sender] }, caption: strConversation })
					fs.unlinkSync(savedFilename)
				}
			}
		} catch (e) {
			console.log('Message : %s', color(e, 'green'))
		}
	})

	alfa.on('message-new', async (Lan) => {
		try {
			if (!Lan.message) return
			if (Lan.key && Lan.key.remoteJid == 'status@broadcast') return
			if (Lan.key.fromMe) return
			let infoMSG = JSON.parse(fs.readFileSync('./src/.dat/msg.data.json'))
			infoMSG.push(JSON.parse(JSON.stringify(Lan)))
			fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
			const urutan_pesan = infoMSG.length
			if (urutan_pesan === 5000) {
				infoMSG.splice(0, 4300)
				fs.writeFileSync('./src/.dat/msg.data.json', JSON.stringify(infoMSG, null, 2))
			}
			global.prefix
			global.blocked
			const content = JSON.stringify(Lan.message)
			const from = Lan.key.remoteJid
			Lan.message = (Object.keys(Lan.message)[0] === 'ephemeralMessage') ? Lan.message.ephemeralMessage.message : Lan.message
			const type = Object.keys(Lan.message)[0]
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const date = new Date().toLocaleDateString()
			body = (type === 'conversation' && Lan.message.conversation.startsWith(prefix)) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption.startsWith(prefix) ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption.startsWith(prefix) ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text.startsWith(prefix) ? Lan.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? Lan.message.conversation : (type === 'extendedTextMessage') ? Lan.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && Lan.message.conversation) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption ? Lan.message.imageMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text ? Lan.message.extendedTextMessage.text : ''
			chats = (type === 'conversation' && Lan.message.conversation) ? Lan.message.conversation : (type == 'imageMessage') && Lan.message.imageMessage.caption ? Lan.message.imageMessage.caption : (type == 'documentMessage') && Lan.message.documentMessage.caption ? Lan.message.documentMessage.caption : (type == 'videoMessage') && Lan.message.videoMessage.caption ? Lan.message.videoMessage.caption : (type == 'extendedTextMessage') && Lan.message.extendedTextMessage.text ? Lan.message.extendedTextMessage.text : ""
			const mesejAnti = pes.slice(0).trim().split(/ +/).shift().toLowerCase()
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			const tescuk = ["0@s.whatsapp.net"]
			const isGroup = from.endsWith('@g.us')
			const q = args.join(' ')
			const botNumber = alfa.user.jid
			const totalchat = await alfa.chats.all()
			const sender = isGroup ? Lan.participant : Lan.key.remoteJid
			const pushname = alfa.contacts[sender] != undefined ? alfa.contacts[sender].vname || alfa.contacts[sender].notify : undefined
			const groupMetadata = isGroup ? await alfa.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isEventon = isGroup ? event.includes(from) : false
			const isRegistered = checkRegisteredUser(sender)
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isLevelingOn = isGroup ? _leveling.includes(from) : false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isBanned = ban.includes(sender)
			const isPrem = premium.includes(sender) || isOwner
			const isAntiLink = isGroup ? antilink.includes(from) : false
            const isBadWord = isGroup ? badword.includes(from) : false
			const Rank = getLevelingLevel(sender)
			const isAfkOn = checkAfkUser(sender, _afk)
			const jumlahfitur = '231'
			const isImage = type === 'imageMessage'
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				alfa.sendMessage(from, teks, text, { quoted: Lan })
			}
			const sendMess = (hehe, teks) => {
				alfa.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? alfa.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : alfa.sendMessage(from, teks.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": memberr } })
			}
			const sendImage = (teks) => {
				alfa.sendMessage(from, teks, image, { quoted: Lan })
			}
			const costum = (pesan, tipe, target, target2) => {
				alfa.sendMessage(from, pesan, tipe, { quoted: { key: { fromMe: false, participant: `${target}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target2}` } } })
			}
			const sendPtt = (teks) => {
				alfa.sendMessage(from, audio, mp3, { quoted: Lan })
			}
const sendFileFromUrl = async(link, type, options) => {
  hasil = await getBuffer(link)
	alfa.sendMessage(from, hasil, type, options).catch(e => {
	fetch(link).then((hasil) => {
	alfa.sendMessage(from, hasil, type, options).catch(e => {
	alfa.sendMessage(from, { url : link }, type, options).catch(e => {
	  reply('_Terjadi kesalahan!_')
	  console.log(e)
	})
	})
	})
	})
	}
        const fakestatus = (teks) => {
            alfa.sendMessage(from, teks, text, {
                quoted: {
                    key: {
                        fromMe: false,
                        participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
                    },
                    message: {
                        "imageMessage": {
                            "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc",
                            "mimetype": "image/jpeg",
                            "caption": cr,
                            "fileSha256": "+Ia+Dwib70Y1CWRMAP9QLJKjIJt54fKycOfB2OEZbTU=",
                            "fileLength": "28777",
                            "height": 1080,
                            "width": 1079,
                            "mediaKey": "vXmRR7ZUeDWjXy5iQk17TrowBzuwRya0errAFnXxbGc=",
                            "fileEncSha256": "sR9D2RS5JSifw49HeBADguI23fWDz1aZu4faWG/CyRY=",
                            "directPath": "/v/t62.7118-24/21427642_840952686474581_572788076332761430_n.enc?oh=3f57c1ba2fcab95f2c0bb475d72720ba&oe=602F3D69",
                            "mediaKeyTimestamp": "1610993486",
                            "jpegThumbnail": fs.readFileSync('./src/image/thumbnail.jpeg'),
                            "scansSidecar": "1W0XhfaAcDwc7xh1R8lca6Qg/1bB4naFCSngM2LKO2NoP5RI7K+zLw=="
                        }
                    }
                }
            })
        }
        const fakeimage = (from, image, caption, cr) => {
                alfa.sendMessage(from, image, MessageType.image,
                {
                quoted: {
                key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) },
                message: { "imageMessage": {
                "mimetype": "image/jpeg", 
                "caption": cr, 
                "jpegThumbnail": fs.readFileSync(`./src/image/thumbnail.jpeg`)
                }
           }
     },
     caption: caption 
     })
}
			var prema = 'Free'
			if (isPrem) {
				prema = 'Premium'
			}
			if (isOwner) {
				prema = 'BOSS'
			}
			var role = 'NEWBIE'
			if (Rank <= 3) {
				role = 'Bronze I'
			} else if (Rank <= 5) {
				role = 'Bronze II'
			} else if (Rank <= 7) {
				role = 'Bronze III'
			} else if (Rank <= 9) {
				role = 'Silver I'
			} else if (Rank <= 11) {
				role = 'Silver II'
			} else if (Rank <= 13) {
				role = 'Silver III'
			} else if (Rank <= 16) {
				role = 'Gold I'
			} else if (Rank <= 18) {
				role = 'Gold II'
			} else if (Rank <= 20) {
				role = 'Gold III'
			} else if (Rank <= 22) {
				role = 'Gold IV'
			} else if (Rank <= 25) {
				role = 'Platinum I'
			} else if (Rank <= 27) {
				role = 'Platinum II'
			} else if (Rank <= 29) {
				role = 'Platinum III'
			} else if (Rank <= 31) {
				role = 'Platinum IV'
			} else if (Rank <= 33) {
				role = 'Diamond I'
			} else if (Rank <= 35) {
				role = 'Diamomd II'
			} else if (Rank <= 37) {
				role = 'Diamond III'
			} else if (Rank <= 39) {
				role = 'Diamond IV'
			} else if (Rank <= 45) {
				role = 'Master'
			} else if (Rank <= 100) {
				role = 'Grand Master'
			}

			if (isGroup && isRegistered && isLevelingOn) {
				const currentLevel = getLevelingLevel(sender)
				const checkId = getLevelingId(sender)
				try {
					if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
					const amountXp = Math.floor(Math.random() * 10) + 500
					const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
					const getLevel = getLevelingLevel(sender)
					addLevelingXp(sender, amountXp)
					if (requiredXp <= getLevelingXp(sender)) {
						addLevelingLevel(sender, 1)
						await reply(nad.levelup(pushname, sender, getLevelingXp, getLevel, getLevelingLevel, role))
					}
				} catch (err) {
					console.error(err)
				}
			}
			if (isGroup) {
				try {
					const getmemex = groupMembers.length
					if (getmemex <= memberlimit) {
						reply(`maaf kak membernya sedikit, aku gak bisa disini! Minimal member : ${memberlimit}`)
						setTimeout(() => {
							alfa.groupLeave(from)
						}, 1000)
						setTimeout(() => {
							alfa.updatePresence(from, Presence.composing)
							reply("Aku pamit ya kak:)")
						}, 0)
					}
				} catch (err) { console.error(err) }
			}
				
for (let kemem of bad) {

if (budy.includes(kemem)) {

				if (!isGroup) return
				if (!isBadWord) return
				if (isGroupAdmins) return reply('Untung Kau Admin:) Btw Jangan Ngegas Om😘')
				alfa.updatePresence(from, Presence.composing)
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Jangan Ngomong Kasar Ngemtod😡`)
				setTimeout(() => {
					alfa.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 1000)
				setTimeout(() => {
					alfa.updatePresence(from, Presence.composing)
					reply("Maaf gue tendang!")
				}, 0)
			}
			}
			/*if (budy.includes("https://chat.whatsapp.com/")) {
				if (!isGroup) return
				if (!isAntiLink) return
				if (isGroupAdmins) return
				alfa.updatePresence(from, Presence.composing)
				if (budy.includes("#izinbos")) return reply("Iya kak jangan spam ya")
				var kic = `${sender.split("@")[0]}@s.whatsapp.net`
				reply(`Woyy ${sender.split("@")[0]} Gak Boleh Share Link`)
				setTimeout(() => {
					alfa.groupRemove(from, [kic]).catch((e) => { reply(`BOT HARUS JADI ADMIN`) })
				}, 1000)
				setTimeout(() => {
					alfa.updatePresence(from, Presence.composing)
					reply("Maaf gue tendang!")
				}, 0)
			}*/
        // Anti link
        if (isGroup && isAntiLink && !isOwner && !isGroupAdmins && isBotGroupAdmins){
            if (chats.match(/(https:\/\/chat.whatsapp.com)/gi)) {
                reply(`*「 GROUP LINK DETECTOR 」*\n\nSepertinya kamu mengirimkan link grup, maaf kamu akan di kick`)
                alfa.groupRemove(from, [sender])
            }
        }
			/*if (isGroup) {
			const mentiAfk = Lan.message[Object.keys(Lan.message)[0]].contextInfo ? Lan.message[Object.keys(Lan.message)[0]].contextInfo.mentionedJid : []
				for (let ment of mentiAfk) {
					if (checkAfkUser(ment, _afk)) {
						const getId = getAfkId(ment, _afk)
						const getReason = getAfkReason(getId, _afk)
						const getTime = getAfkTime(getId, _afk)
						alfa.sendMessage(from, `「 *AFK MODE* 」
${a}Orang Nya Lagi AFK${a}
${a}Alasan : ${getReason}${a}
${a}Sejak : ${getTime}${a}
`, text, { quoted: Lan })
					}
				}
				if (checkAfkUser(sender, _afk) && !isCmd) {
					_afk.splice(getAfkPosition(sender, _afk), 1)
					fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
					alfa.sendMessage(from, `${pushname} Telah Kembali Dari AFK\nPasti Gabut Yekan :v`, text, { quoted: Lan })
				}
			}*/
let OrgMention = []
        if (type === 'extendedTextMessage' && Lan.message.extendedTextMessage.contextInfo != null){
            OrgMention = Lan.message.extendedTextMessage.contextInfo.mentionedJid || []
        } else if (type === 'imageMessage' && Lan.message.imageMessage.contextInfo != null){
            OrgMention = Lan.message.imageMessage.contextInfo.mentionedJid || []
        } else if (type === 'videoMessage' && Lan.message.videoMessage.contextInfo != null){
            OrgMention = Lan.message.videoMessage.contextInfo.mentionedJid || []
        }
// AFK
        if (isGroup) {
            if (OrgMention.length != 0){
            for (let ment of OrgMention) {
                if (checkAfkUser(ment, _afk)) {
                    memberid = []
                    const getId = getAfkId(ment, _afk)
                    const getReason = getAfkReason(getId, _afk)
                    const getTime = getAfkTime(getId, _afk)
                    //const heheh = ms(getTime)
                    memberid.push(ment)
                    await mentions(`@${ment.split('@')[0]} sedang afk\n\n*Alasan :* ${getReason}\n*Sejak :* ${getTime}`, memberid, true)
                    sendMess(ment, `Ada yang mencari anda saat anda offline\n\nNama : ${pushname}\nNomor : wa.me/${sender.split("@")[0]}\nIn Group : ${groupName}\nPesan : ${budy}`)
                }
                if (ment === ownerNumber){
                    reply('Apa si tag tag owner ku')
                }
                if (ment === alfa.user.jid){
                    reply(`Ya ada apa ${pushname}, silahkan kirim ${prefix}menu`)
                }
            }
        }
            if (checkAfkUser(sender, _afk)) {
                anu = []
                _afk.splice(getAfkPosition(sender, _afk), 1)
                fs.writeFileSync('./database/afk.json', JSON.stringify(_afk))
                anu.push(sender)
                await mentions(`@${sender.split('@')[0]} telah kembali`, anu, true)
            }
        }
// TEBAK GAMBAR
if (tebakgambar.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakgambar[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar!")
                    delete tebakgambar[sender.split('@')[0]]
                    fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// CAK LONTONG
if (caklontong.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = caklontong[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete caklontong[sender.split('@')[0]]
                    fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// FAMILY 100
if (family.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = family[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete family[sender.split('@')[0]]
                    fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// TEBAK ANIME
if (tebakanime.hasOwnProperty(sender.split('@')[0]) && !isCmd) {
                jawaban = tebakanime[sender.split('@')[0]]
                if (budy.toLowerCase() == jawaban) {
                    reply("Selamat🥳 Jawaban kamu benar")
                    delete tebakanime[sender.split('@')[0]]
                    fs.writeFileSync("./database/tebakanime.json", JSON.stringify(tebakanime))
                } else {
                    reply("Jawaban Salah!")
                }
            }
// HOAX
const Hoax = async (p) => {
const lingk = await axios.get(`https://turnbackhoax.id/`)
const sop = cheerio.load(lingk.data)
const result = []
sop('div').find('header').each(function(c, d) {
const judul = sop(d).find('h3 > a').text().replace('\n', '').replace('\t\t\t\t\t', '').replace('\t\t\t\t', '') 
const link = sop(d).find('h3 > a').attr('href')
const author = sop(d).find('div > span').eq(1).text()
const waktu = sop(d).find('div > span').eq(0).text()
const komen = sop(d).find('div > span').eq(2).text()
const keterangan = sop('article > div > div > div').eq(0).text() 
const img = sop('article > figure > a > img').attr('src')
result.push({ judul, link, keterangan, img, waktu, author, komen })
})

return result
}
			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			const isQuotedText = type === 'extendedTextMessage' && content.includes('extendedTextMessage')
			if (!isGroup && isCmd) console.log('[\x1b[1;32mCMD\x1b[1;37m]', color(time, 'yellow'), color(command), 'dari', color(pushname), '/', color(sender.split('@')[0]))
			if (isGroup && isCmd) console.log('[\x1b[1;32mCMD\x1b[1;37m]', color(time, 'yellow'), color(command), 'dari', color(pushname), '/', color(sender.split('@')[0]), '\n', 'in', color(groupName, 'yellow'))
			if (isTicTacToe(from, tictactoe)) tictac(alfa, Lan, tictactoe)
			switch (command) {
				case 'help':
				case 'menu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const reqXp = 5000 * (Math.pow(2, getLevelingLevel(sender)) - 1)
					const lvl = getLevelingLevel(sender)
					gmenu = fs.readFileSync(`./src/image/thumbnail.jpeg`)
					const menunya = `━━ 「 *BOT WHATSAPP* 」 ━━

╭─❒*「 *INFO USER BOT* 」*
│${a}❏ Nama : ${pushname}${a}
│${a}❏ User : ${prema}${a}
│${a}❏ Xp : ${reqXp}${a}
│${a}❏ Rank : ${role}${a}
│${a}❏ Level : ${lvl}${a}
╰──────────────┈ ⳹

╭─❒*「 *INFO BOT* 」*
│${a}❏ Nama : ${botName}${a}
│${a}❏ Owner : ${ownerName}${a}
│${a}❏ Prefix : 「 ${prefix} 」${a}
│${a}❏ Total Register : ${_registered.length}${a}
│${a}❏ User Premium : ${premium.length}${a}
│${a}❏ Total Fitur : ${jumlahfitur}${a}
╰──────────────────┈ ⳹

╭─❒*「 *LIST MENU* 」*
│${a}❏ ${prefix}simplemenu${a}
│${a}❏ ${prefix}groupmenu${a}
│${a}❏ ${prefix}downloadmenu${a}
│${a}❏ ${prefix}makermenu${a}
│${a}❏ ${prefix}gabutmenu${a}
│${a}❏ ${prefix}randommenu${a}
│${a}❏ ${prefix}nsfwmenu${a}
│${a}❏ ${prefix}toolsmenu${a}
│${a}❏ ${prefix}mutualmenu${a}
│${a}❏ ${prefix}othermenu${a}
│${a}❏ ${prefix}storagemenu${a}
│${a}❏ ${prefix}ownermenu${a}
╰──────────────────┈ ⳹

╭─❒*「 *ABOUT* 」*
│${a}❏ ${prefix}sourcecode${a}
│${a}❏ ${prefix}runtime${a}
│${a}❏ ${prefix}creator${a}
│${a}❏ ${prefix}donasi${a}
│${a}❏ ${prefix}iklan${a}
│${a}❏ ${prefix}speed${a}
│${a}❏ ${prefix}info${a}
╰────────────┈ ⳹

╭─❒*「 *JASA SEWA BOT* 」*
││✙ *5K /minggu
││✙ *15K /bulan
││✙ *25K /manen
││✙ *Kalo mau sewa langsung chat ↓
││✙ *wa.me/6285704682918
││✙ *Langsung Ketik ${prefix}sewabot
││✙ *NB : Sewa hanya untuk grup!!! 
╰─────────────────────┈ ⳹


╭─❒*「 *THANKS TO* 」*
│${a}❏ YT Ramlan ID${a}
│${a}❏ MrG3P5${a}
│${a}❏ MrHRTZ${a}
│${a}❏ Nafizz${a}
│${a}❏ Aqulzz${a}
│${a}❏ Arifi Razzaq${a}
│${a}❏ ZEEONE OFC${a}
│${a}❏ FxAG Xc${a}
│${a}❏ RURIBOTZ${a}
│${a}❏ XynnBotz${a}
│${a}❏ Manik${a}
│${a}❏ Adiwajshing/baileys${a}
│${a}❏ MhankBarBar${a}
│${a}❏ SlavyanDesu${a}
│${a}❏ Penyedia API${a}
╰─────────────────┈ ⳹

╭─❒*RULES*
│${a}•>Telp/Vc = Block${a}
│${a}•>Spam = Block + Banned${a}
╰────────────────────┈ ⳹

━━ 「 *BOT WHATSAPP* 」 ━━`
				fakeimage(from, gmenu, menunya, cr)
				//fakestatus(menunya)
				//alfa.sendMessage(from, gmenu, image, {quoted: Lan, caption: menunya})
				break
				
				case 'antidelete':
					if (!isOwner) return reply(nad.ownerb())
					const dataRevoke = JSON.parse(fs.readFileSync('./src/gc-revoked.json'))
					const dataCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked.json'))
					const dataBanCtRevoke = JSON.parse(fs.readFileSync('./src/ct-revoked-banlist.json'))
					const isRevoke = dataRevoke.includes(from)
					const isCtRevoke = dataCtRevoke.data
					const isBanCtRevoke = dataBanCtRevoke.includes(sender) ? true : false
					const argz = body.split(' ')
					if (argz.length === 1) return fakestatus(`Penggunaan fitur antidelete :\n\n*${prefix}antidelete [aktif/mati]* (Untuk grup)\n*${prefix}antidelete [ctaktif/ctmati]* (untuk semua kontak)\n*${prefix}antidelete banct 62855xxxxxxx* (banlist kontak)`)
					if (argz[1] == 'aktif') {
						if (isGroup) {
							if (isRevoke) return fakestatus(`Antidelete telah diaktifkan di grup ini sebelumnya!`)
							dataRevoke.push(from)
							fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
							fakestatus(`Antidelete diaktifkan di grup ini!`)
						} else if (!isGroup) {
							fakestatus(`Untuk kontak penggunaan *${prefix}antidelete ctaktif*`)
						}
					} else if (argz[1] == 'ctaktif') {
						if (!isGroup) {
							if (isCtRevoke) return fakestatus(`Antidelete telah diaktifkan di semua kontak sebelumnya!`)
							dataCtRevoke.data = true
							fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
							fakestatus(`Antidelete diaktifkan disemua kontak!`)
						} else if (isGroup) {
							fakestatus(`Untuk grup penggunaan *${prefix}antidelete aktif*`)
						}
					} else if (argz[1] == 'banct') {
						if (isBanCtRevoke) return fakestatus(`kontak ini telah ada di database banlist!`)
						if (argz.length === 2 || argz[2].startsWith('0')) return fakestatus(`Masukan nomer diawali dengan 62! contoh 628555xxxxx`)
						dataBanCtRevoke.push(argz[2] + '@s.whatsapp.net')
						fs.writeFileSync('./src/ct-revoked-banlist.json', JSON.stringify(dataBanCtRevoke, null, 2))
						fakestatus(`Kontak ${argz[2]} telah dimasukan ke banlist antidelete secara permanen!`)
					} else if (argz[1] == 'mati') {
						if (isGroup) {
							const index = dataRevoke.indexOf(from)
							dataRevoke.splice(index, 1)
							fs.writeFileSync('./src/gc-revoked.json', JSON.stringify(dataRevoke, null, 2))
							fakestatus(`Antidelete dimatikan di grup ini!`)
						} else if (!isGroup) {
							fakestatus(`Untuk kontak penggunaan *${prefix}antidelete ctmati*`)
						}
					} else if (argz[1] == 'ctmati') {
						if (!isGroup) {
							dataCtRevoke.data = false
							fs.writeFileSync('./src/ct-revoked.json', JSON.stringify(dataCtRevoke, null, 2))
							fakestatus(`Antidelete dimatikan disemua kontak!`)
						} else if (isGroup) {
							fakestatus(`Untuk grup penggunaan *${prefix}antidelete mati*`)
						}
					}
					break
				case 'owner':
				case 'creator':
					alfa.sendMessage(from, { displayname: "Jeff", vcard: vcard }, MessageType.contact, { quoted: Lan })
					.then((res) => alfa.sendMessage(from, 'Tuh Nomor Pacarku >_<, Ehh Ownerku mksdnya:v', MessageType.text, { quoted: res }))
					break

				case 'donasi':
				case 'donate':
				alfa.sendMessage(from, nad.donasi(), text, { quoted: Lan })
					break
				case 'iklan':
				alfa.sendMessage(from, nad.iklan(botName, ownerNumbers, ownerName), text, { quoted: Lan })
					break

				case 'speed':
				case 'ping':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const timestamp = speed();
					const latensi = speed() - timestamp
					fakestatus(`Speed: ${latensi.toFixed(4)} _ms_`)
					break
				case 'runtime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					runtime = process.uptime()
					runte = `「 *RUNTIME* 」\n${kyun(runtime)}`
					fakestatus(`${runte}`)
					break
				case 'sourcecode': case 'sc':
				fakestatus(`Bot ini menggunakan script : https://github.com/Ramlan404/babybot`)
				break
					
					case 'info':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					let i = []
				let giid = []
				for (mem of totalchat){
					i.push(mem.jid)
				}
				for (id of i){
					if (id && id.includes('g.us')){
						giid.push(id)
					}
				}
                let timestampi = speed();
				let latensii = speed() - timestampi
                anu = process.uptime()
					mee = alfa.user
					ca = totalchat
					ginfo = fs.readFileSync(`./src/image/thumbnail.jpeg`)
					inponya = `━━ 「 *INFO* 」 ━━
${a}❏ Bot type : NodeJS V14${a}
${a}❏ Owner : ${ownerName}${a}
${a}❏ Name : ${alfa.user.name}${a}
${a}❏ Browser : ${alfa.browserDescription[1]}${a}
${a}❏ Server : ${alfa.browserDescription[0]}${a}
${a}❏ Version : ${alfa.browserDescription[2]}${a}
${a}❏ Speed : ${latensii.toFixed(4)} Second${a}
${a}❏ Handphone : ${alfa.user.phone.device_manufacturer}${a}
${a}❏ Versi WA : ${alfa.user.phone.wa_version}${a}
${a}❏ Group Chat : ${giid.length}${a}
${a}❏ Personal Chat : ${totalchat.length - giid.length}${a}
${a}❏ Total Chat : ${totalchat.length}${a}
${a}❏ Total Block Contact : ${blocked.length}${a}

╭─❒*「 *THANKS TO* 」*
│${a}❏ YT Ramlan ID${a}
│${a}❏ MrG3P5${a}
│${a}❏ MrHRTZ${a}
│${a}❏ Nafizz${a}
│${a}❏ Aqulzz${a}
│${a}❏ Arifi Razzaq${a}
│${a}❏ ZEEONE OFC${a}
│${a}❏ FxAG Xc${a}
│${a}❏ RURIBOTZ${a}
│${a}❏ XynnBotz${a}
│${a}❏ Manik${a}
│${a}❏ Adiwajshing/baileys${a}
│${a}❏ MhankBarBar${a}
│${a}❏ SlavyanDesu${a}
│${a}❏ Penyedia API${a}
╰─────────────────┈ ⳹

「 *BOT WHATSAPP* 」`
					fakeimage(from, ginfo, inponya, cr)
					break

				case 'simplemenu':
				case 'simpelmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const simpel = `「 *SIMPLE MENU* 」
╭─❒
│${a}❏ ${prefix}sticker${a}
│${a}❏ ${prefix}stickergif${a}
│${a}❏ ${prefix}nulis${a}
│${a}❏ ${prefix}stalkig${a}
│${a}❏ ${prefix}tts${a}
│${a}❏ ${prefix}ttp${a}
│${a}❏ ${prefix}attp${a}
│${a}❏ ${prefix}simi${a}
│${a}❏ ${prefix}quotes${a}
│${a}❏ ${prefix}bikinquote${a}
╰────────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(simpel)
					break
				case 'sticker':
				case 'stiker':
				case 'stickergif':
				case 'stikergif':
				case 'sgif':
				case 's':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        const media = await alfa.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        await ffmpeg(`./${media}`)
                            .input(media)
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                reply(nad.stikga())
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ./sticker/data.exif ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(nad.stikga())
                                    await alfa.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: Lan })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia && Lan.message.videoMessage.seconds < 11 || isQuotedVideo && Lan.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
                        const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        const media = await alfa.downloadAndSaveMediaMessage(encmedia)
                        ran = getRandom('.webp')
                        reply(nad.wait())
                        await ffmpeg(`./${media}`)
                            .inputFormat(media.split('.')[1])
                            .on('start', function (cmd) {
                                console.log(`Started : ${cmd}`)
                            })
                            .on('error', function (err) {
                                console.log(`Error : ${err}`)
                                fs.unlinkSync(media)
                                tipe = media.endsWith('.mp4') ? 'video' : 'gif'
                                reply(`❌ Gagal, pada saat mengkonversi ${tipe} ke stiker`)
                            })
                            .on('end', function () {
                                console.log('Finish')
                                exec(`webpmux -set exif ${addMetadata(`${autor}`, `${peknem}`)} ${ran} -o ${ran}`, async (error) => {
                                    if (error) return reply(nad.stikga())
                                    await alfa.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: Lan })
                                    fs.unlinkSync(media)
                                    fs.unlinkSync(ran)
                                })
                            })
                            .addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
                            .toFormat('webp')
                            .save(ran)
                    } else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
                        const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        const media = await alfa.downloadAndSaveMediaMessage(encmedia)
                        ranw = getRandom('.webp')
                        ranp = getRandom('.png')
                        reply(mess.wait)
                        keyrmbg = 'Your-ApiKey'
                        await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg, size: 'auto', type: 'auto', ranp }).then(res => {
                            fs.unlinkSync(media)
                            let bufferir9vn5 = Buffer.from(res.base64img, 'base64')
                            fs.writeFileSync(ranp, bufferir9vn5, (err) => {
                                if (err) return reply('Gagal, Terjadi kesalahan, silahkan coba beberapa saat lagi.')
                            })
                            exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
                                fs.unlinkSync(ranp)
                                if (err) return reply(nad.stikga())
                                exec(`webpmux -set exif ${addMetadata(`${autor}`, authorname)} ${ranw} -o ${ranw}`, async (error) => {
                                    if (error) return reply(mess.error.stick)
                                    alfa.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: Lan })
                                    fs.unlinkSync(ranw)
                                })
                            })
                        })
                    } else {
                        reply(`Kirim gambar dengan caption ${prefix}sticker atau tag gambar yang sudah dikirim\nDurasi sticker video 1-9 detik...`)
                    }
                    break					
				case 'nulis':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teksnya mana kak? Contoh : ${prefix}nulis Alfa baik hati`)
					reply('「❗」WAIT BRO GUE NULIS DUMLU YAKAN')
					kir = await getBuffer(`https://api.zeks.xyz/api/nulis?apikey=${zeksapi}&text=${q}`)
					alfa.sendMessage(from, kir, image, { quoted: Lan, caption: 'Nihh kak' })
					break

				case 'stalkig':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan username!\nContoh :\n${prefix}stalkig iamAlfa_`)
					anu = await fetchJson(`https://api.zeks.xyz/api/igstalk?apikey=${zeksapi}&username=${q}`)
					reply('「❗」Sabar Lagi Stalking IG nya kak')
					stig = await getBuffer(anu.profile_pic)
					hasil = `YAHAHA TELAH DI STALK BOS KU UNTUK USERNAME ${q}
◯ Nama : ${anu.fullname}
◯ Follower : ${anu.follower}
◯ Following : ${anu.following}
◯ Biografi : ${anu.bio}`
					alfa.sendMessage(from, stig, image, { quoted: Lan, caption: hasil })
					break

				case 'tts':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return alfa.sendMessage(from, `Kode bahasanya mana kak? contoh : ${prefix}tts id Halo Alfa`, text, { quoted: Lan })
					const gtts = require('./lib/gtts')(args[0])
					if (args.length < 2) return alfa.sendMessage(from, `Teksnya mana kak | contoh : ${prefix}tts id ah yamate kudasai`, text, { quoted: Lan })
					var bby = body.slice(8)
					ranm = getRandom('.mp3')
					rano = getRandom('.ogg')
					bby.length > 300
						? reply('Teks nya terlalu panjang kak')
						: gtts.save(ranm, bby, function () {
							exec(`ffmpeg -i ${ranm} -ar 48000 -vn -c:a libopus ${rano}`, (err) => {
								fs.unlinkSync(ranm)
								buff = fs.readFileSync(rano)
								if (err) return reply(nad.stikga())
								alfa.sendMessage(from, buff, audio, { quoted: Lan, ptt: true })
								fs.unlinkSync(rano)
							})
						})
					break

				case 'ttp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}ttp Alfa`)
					tetepe = await getBuffer(`https://api.lolhuman.xyz/api/ttp?apikey=YukinoApi&text=${q}`)
					alfa.sendMessage(from, tetepe, sticker, { quoted: Lan })
					break
				case 'attp':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}attp BOT`)
					atetepe = await getBuffer(`https://api.xteam.xyz/attp?file&text=${encodeURIComponent(q)}`)
					alfa.sendMessage(from, atetepe, sticker, { quoted: Lan })
					break

				case 'simi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Mau Ngapain?\nContoh :\n${prefix}simi halo`)
					anu = await fetchJson(`https://api.zeks.xyz/api/simi?apikey=${zeksapi}&text=${q}`)
					reply(anu.result)
					break

				case 'quotes':
					alfa.updatePresence(from, Presence.composing)
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/quote.json');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					randQuote = '' + randKey.quote + '\n\n_By: ' + randKey.by + '_'
					fakestatus(randQuote)
					break

				case 'bikinquote':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(12)
					var quote = gh.split("&")[0];
					var wm = gh.split("&")[1];
					const pref = `yang mau dijadiin quote apaan, titit?\ncontoh :\n${prefix}bikinquote Ya & Kata Alfa`
					if (args.length < 1) return reply(pref)
					reply(nad.wait())
					anu = await fetchJson(`https://terhambar.com/aw/qts/?kata=${quote}&author=${wm}&tipe=random`, { method: 'get' })
					biquote = await getBuffer(anu.result)
					alfa.sendMessage(from, biquote, image, { caption: 'Nih kak >_<', quoted: Lan })
					break
				case 'groupmenu':
				case 'grupmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const menugrup = `「 *GROUP MENU* 」
╭─❒
│${a}❏ ${prefix}welcome${a}
│${a}❏ ${prefix}leveling${a}
│${a}❏ ${prefix}antilink${a}
│${a}❏ ${prefix}antibadword${a}
│${a}❏ ${prefix}nsfw${a}
│${a}❏ ${prefix}group${a}
│${a}❏ ${prefix}admin${a}
│${a}❏ ${prefix}add${a}
│${a}❏ ${prefix}kick${a}
│${a}❏ ${prefix}hidetag${a}
│${a}❏ ${prefix}hidetag20${a}
│${a}❏ ${prefix}level${a}
│${a}❏ ${prefix}linkgroup${a}
│${a}❏ ${prefix}tagall${a}
│${a}❏ ${prefix}setname${a}
│${a}❏ ${prefix}setdesc${a}
│${a}❏ ${prefix}demote${a}
│${a}❏ ${prefix}promote${a}
│${a}❏ ${prefix}hedsot${a}
│${a}❏ ${prefix}fitnah${a}
│${a}❏ ${prefix}leave${a}
│${a}❏ ${prefix}delete${a}
│${a}❏ ${prefix}mining${a}
│${a}❏ ${prefix}afk${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(menugrup)
					break
				case 'nsfw':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}nsfw 1`)
					if (Number(args[0]) === 1) {
						if (isNsfw) return reply('Sudah Aktif Kak')
						nsfw.push(from)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isNsfw) return reply('Sudah Mati Kak')
						var ini = nsfw.indexOf(from)
						nsfw.splice(ini, 1)
						fs.writeFileSync('./database/nsfw.json', JSON.stringify(nsfw))
						reply('「 SUKSES 」Fitur NSFW Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break
				case 'antibadword':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antibadword 1`)
					if (Number(args[0]) === 1) {
						if (isBadWord) return reply('Sudah Aktif Kak')
						badword.push(from)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Diaktifkan')
						alfa.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti Badword\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isBadWord) return reply('Sudah Mati Kak')
						var ini = badword.indexOf(from)
						badword.splice(ini, 1)
						fs.writeFileSync('./database/badword.json', JSON.stringify(badword))
						reply('「 SUKSES 」Fitur Anti Badword Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'afk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (isAfkOn) return await reply('Kau Sudah AFK Di Group Lain')
					const aepka = body.slice(5)
					const reason = aepka ? aepka : 'Gak Jelas'
					addAfkUser(sender, time, reason, _afk)
					alfa.sendMessage(from, `「 *BERHASIL AFK* 」
${a}Dengan Data Berikut :${a}
${a}Nama : ${pushname}${a}
${a}Alasan : ${reason}${a}
${a}Dinyatakan Telah AFK!${a}
`, text, { quoted: Lan })
					break

				case 'welcome':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}welcome 1`)
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Sudah Aktif Kak')
						welkom.push(from)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isWelkom) return reply('Sudah Mati Kak')
						var ini = welkom.indexOf(from)
						welkom.splice(ini, 1)
						fs.writeFileSync('./database/welkom.json', JSON.stringify(welkom))
						reply('「 SUKSES 」Fitur Welcome Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'leveling':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}leveling 1`)
					if (Number(args[0]) === 1) {
						if (isLevelingOn) return reply('Sudah Aktif Kak')
						_leveling.push(from)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Diaktifkan')
					} else if (Number(args[0]) === 0) {
						if (!isLevelingOn) return reply('Sudah Mati Kak')
						var ini = _leveling.indexOf(from)
						_leveling.splice(ini, 1)
						fs.writeFileSync('./database/leveling.json', JSON.stringify(_leveling))
						reply('「 SUKSES 」Fitur Level Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'antilink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk mengaktifkan ketik : ${prefix}antilink 1`)
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('Sudah Aktif Kak')
						antilink.push(from)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Diaktifkan')
						alfa.sendMessage(from, `ALLERT!!! Group ini sudah di pasang anti link\nJika Kamu Melanggar Maka Akan Saya Tendang`, text)
					} else if (Number(args[0]) === 0) {
						if (!isAntiLink) return reply('Sudah Mati Kak')
						var ini = antilink.indexOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./database/antilink.json', JSON.stringify(antilink))
						reply('「 SUKSES 」Fitur Anti Link Dimatikan')
					} else {
						reply('1 untuk mengaktifkan, 0 untuk mematikan')
					}
					break

				case 'grup':
				case 'group':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply(`untuk membuka : ${prefix}group buka\nuntuk menutup : ${prefix}group tutup`)
					if (args[0] === 'buka') {
						reply(`Berhasil Membuka group`)
						alfa.groupSettingChange(from, GroupSettingChange.messageSend, false)
					} else if (args[0] === 'tutup') {
						reply(`Berhasil Menutup Group`)
						alfa.groupSettingChange(from, GroupSettingChange.messageSend, true)
					}
					break

				case 'admin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					adm = `*ATASAN GROUP* _${groupMetadata.subject}_\n*TOTAL* : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						adm += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(adm, groupAdmins, true)
					break

				case 'add':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (args.length < 1) return reply('Yang mau di add siapa?')
					if (args[0].startsWith('08')) return reply('Gunakan kode bahasa kak')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						alfa.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('Anjim yang mau di add di private, dahlah :)')
					}
					break

				case 'kick':
                if (!isGroup) return reply(nad.groupo)
                if (!isBotGroupAdmins) return reply(nad.badmin)
                if (!isGroupAdmins) return reply(nad.admin)
                if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('ð—§ð—®ð—´ ð˜ð—®ð—¿ð—´ð—²ð˜ ??ð—®ð—»ð—´ ð—¶ð—»ð—´ð—¶ð—» ð—±ð—¶ ð˜ð—²ð—»ð—±ð—®ð—»ð—´!')
                mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentioned.length > 1) {
                teks = ''
                for (let _ of mentioned) {
                teks += `Asek jatah kick, goreng goreng dulu gak sehhh, otw kick ðŸ¤­ :\n`
                teks += `@_.split('@')[0]`
                }
                mentions(teks, mentioned, true)
                alfa.groupRemove(from, mentioned)
                } else {
                mentions(`Asek jatah kick, goreng goreng dulu gak sehhh, otw kick @${mentioned[0].split('@')[0]} ðŸ¤­`, mentioned, true)
                alfa.groupRemove(from, mentioned)
                }
                break
					
					case 'hidetag':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					var value = body.slice(9)
					var group = await alfa.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					alfa.sendMessage(from, options, text)
					break
				case 'hidetag20':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isGroup) return reply(nad.groupo())
					var value = body.slice(11)
					var group = await alfa.groupMetadata(from)
					var member = group['participants']
					var mem = []
					member.map( async adm => {
					mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
					})
					var options = {
					text: value,
					contextInfo: { mentionedJid: mem },
					quoted: Lan
					}
					alfa.sendMessage(from, options, text)
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                 .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
	                .then(() => {alfa.sendMessage(from, options, text)})
					break

				case 'level':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isLevelingOn) return reply(nad.lvlnoon())
					if (!isGroup) return reply(nad.groupo())
					const userLevel = getLevelingLevel(sender)
					const userXp = getLevelingXp(sender)
					if (userLevel === undefined && userXp === undefined) return reply(nad.lvlnul())
					const requiredXp = 5000 * (Math.pow(2, userLevel) - 1)
					resul = `┏━━━━━━♡ *LEVEL* ♡━━━━━━━┓\n┃╭───────────────────\n┃│➸ NAMA : ${pushname}\n┃│➸ NOMOR : wa.me/${sender.split("@")[0]}\n┃│➸ XP : ${userXp}/${requiredXp}\n┃│➸ LEVEL : ${userLevel}\n┃╰───────────────────\n┗━━━━━━━━━━━━━━━━━━━━┛`
					alfa.sendMessage(from, resul, text, { quoted: Lan })
						.catch(async (err) => {
							console.error(err)
							await reply(`Error!\n${err}`)
						})
					break

				case 'linkgrup':
				case 'linkgroup':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					linkgc = await alfa.groupInviteCode(from)
					yeh = `https://chat.whatsapp.com/${linkgc}\n\nlink Group *${groupName}*`
					alfa.sendMessage(from, yeh, text, { quoted: Lan })
					break

				case 'tagall':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					members_id = []
					taga = (args.length > 1) ? body.slice(8).trim() : ''
					taga += '\n\n'
					for (let mem of groupMembers) {
						taga += `➸ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(taga, members_id, true)
					break

				case 'setname':
				if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					alfa.groupUpdateSubject(from, `${body.slice(9)}`)
					alfa.sendMessage(from, '「 SUKSES 」Mengubah Nama Grup', text, { quoted: Lan })
					break

				case 'setdesc':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					alfa.groupUpdateDescription(from, `${body.slice(9)}`)
					alfa.sendMessage(from, '*「 SUKSES 」Mengubah Desk Grup', text, { quoted: Lan })
					break

				case 'demote':
				case 'demot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('𝗧𝗮𝗴 𝘁𝗮𝗿𝗴𝗲𝘁 𝘆𝗮𝗻𝗴 𝗶𝗻𝗴𝗶𝗻 𝗱𝗶 𝘁𝗲𝗻𝗱𝗮𝗻𝗴!')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						dem = ''
						for (let _ of mentioned) {
							dem += `*jabatan kamu di copot*🏃 :\n`
							dem += `@_.split('@')[0]`
						}
						mentions(dem, mentioned, true)
						alfa.groupDemoteAdmin(from, mentioned)
					} else {
						mentions(`Yahh @${mentioned[0].split('@')[0]} Jabatan kamu sebagai leluhur di grup telah di copot🏃`, mentioned, true)
						alfa.groupDemoteAdmin(from, mentioned)
					}
					break

				case 'promote':
				case 'promot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						prom = ''
						for (let _ of mentioned) {
							prom += `Yeee🥳 Kamu naik jabatan >_< :\n`
							prom += `@_.split('@')[0]`
						}
						mentions(prom, mentioned, true)
						alfa.groupMakeAdmin(from, mentioned)
					} else {
						mentions(`Selamat🥳 @${mentioned[0].split('@')[0]} *anda naik menjadi admin group* >_<`, mentioned, true)
						alfa.groupMakeAdmin(from, mentioned)
					}
					break

				case 'kick':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					if (!isBotGroupAdmins) return reply(nad.badmin())
					if (Lan.message.extendedTextMessage === undefined || Lan.message.extendedTextMessage === null) return reply('Tag Orang Nya Kak')
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						heds = 'Bismillah Hedsot >_< :\n'
						for (let _ of mentioned) {
							heds += `@${_.split('@')[0]}\n`
						}
						mentions(heds, mentioned, true)
						alfa.groupRemove(from, mentioned)
						mentions(heds, mentioned, true)
						alfa.groupAdd(from, [num])
					} else {
						mentions(`Berhasil Meng hedsot kepalanya  : @${mentioned[0].split('@')[0]}`, mentioned, true)
						alfa.groupRemove(from, mentioned)
					}
					break

				case 'fitnah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (args.length < 1) return reply(`Gini kak : ${prefix}fitnah [@tag&pesan&balasanbot]\n\nContoh : ${prefix}fitnah @tagmember&hai&hai juga`)
					var gh = body.slice(8)
					mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
					var replace = gh.split("&")[0];
					var target = gh.split("&")[1];
					var bot = gh.split("&")[2];
					alfa.sendMessage(from, `${bot}`, text, { quoted: { key: { fromMe: false, participant: `${mentioned}`, ...(from ? { remoteJid: from } : {}) }, message: { conversation: `${target}` } } })
					break

				case 'leave':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isGroupAdmins) return reply(nad.admin())
					setTimeout(() => {
						alfa.groupLeave(from)
					}, 2000)
					setTimeout(() => {
						alfa.updatePresence(from, Presence.composing)
						if (!isRegistered) return reply(nad.noregis())
						if (isBanned) return reply(nad.baned())
						fakestatus('Aku pamit kak:)')
					}, 0)
					break

				case 'del':
				case 'delete':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					alfa.deleteMessage(from, { id: Lan.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: true })
					break

				case 'mining':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isEventon) return reply(`maaf ${pushname} event mining tidak di aktifkan sama owner ${ownerName}`)
					if (isOwner) {
						const one = 999999999
						addLevelingXp(sender, one)
						addLevelingLevel(sender, 99)
						reply(`karena ${ownerName} baik Bot memberikan ${one}Xp >_<`)
					} else {
						const mining = Math.ceil(Math.random() * 10000)
						addLevelingXp(sender, mining)
						await reply(`*selamat* ${pushname} kamu mendapatkan *${mining}Xp*`)
					}
					break

				case 'downloadmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const donlot = `「 *DOWNLOAD MENU* 」
╭─❒
│${a}❏ ${prefix}play${a}
│${a}❏ ${prefix}playmp4${a}
│${a}❏ ${prefix}ytmp3${a}
│${a}❏ ${prefix}ytmp4${a}
│${a}❏ ${prefix}tiktok${a}
│${a}❏ ${prefix}tiktokmp3${a}
│${a}❏ ${prefix}instagram${a}
│${a}❏ ${prefix}facebook${a}
│${a}❏ ${prefix}ytsearch${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(donlot)
					break
//------------------< Downloader >-------------------
case 'facebook':
case 'fb':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}facebook url`)
if(!isUrl(args[0]) && !args[0].includes('facebook')) return reply('Link tidak valid')
ngen = args.join(' ')
reply(nad.wait())
res = await fbDown(ngen).catch(e => {
  reply('Error!')
})
a = res[0]
result = `*「 FACEBOOK DOWNLOAD 」*

➸ *Judul :* ${a.judul}
➸ *Size :* ${a.size}
➸ *Source :* ${a.source}
➸ *Kualitas :* ${a.quality}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(a.thumb, image, {caption: result, quoted: Lan})
sendFileFromUrl(a.link, video, { mimetype: 'video/mp4',quoted: Lan, filename: `${a.judul}.${a.type}`})
                .catch((err) => {
                    sendMess(ownerNumber, 'Fb Error : ' + err)
                    console.log(color('[FB]', 'red'), err)
					reply('Error!')
                })
break
case 'ytmp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}ytmp3 url`)
if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
ngen = args.join(' ')
reply(nad.wait())
res = await y2mateA(ngen).catch(e => {
reply('Error!')
})
result = `*「 YOUTUBE AUDIO 」*

➸ *Judul :* ${res[0].judul}
➸ *Ukuran :* ${res[0].size}
➸ *Kualitas :* ${res[0].quality}kbps

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: Lan}).then((lalu) => {
sendFileFromUrl(res[0].link, audio, {quoted: Lan, mimetype: 'audio/mp4', filename: res[0].output})
})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTMp3 Error : ' + err)
                    console.log(color('[YTMP3]', 'red'), err)
					reply('Error!')
                })
break
case 'ytmp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}ytmp4 url`)
if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply('Link tidak valid!')
ngen = args.join(' ')
reply(nad.wait())
res = await y2mateV(ngen).catch(e => {
reply('Error!')
})
result = `*「 YOUTUBE VIDEO 」*

➸ *Judul :* ${res[0].judul}
➸ *Ukuran :* ${res[0].size}
➸ *Kualitas :* ${res[0].quality}p
➸ *Nama File :* ${res[0].output}
➸ *Output :* ${res[0].tipe}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res[0].thumb, image, {caption: result, quoted: Lan}).then((lalu) => {
sendFileFromUrl(res[0].link, video, {quoted: Lan, mimetype: 'video/mp4', filename: res[0].output})
})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTMp4 Error : ' + err)
                    console.log(color('[YTMP4]', 'red'), err)
					reply('Error!')
                })
break
case 'play':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}play judul`)
ngen = args.join(' ')
reply(nad.wait())
res = await yts(`${ngen}`).catch(e => {
reply('Error')
})
let thumbInfo = `*「 YOUTUBE PLAY 」*
➸ *Judul :* ${res.all[0].title}
➸ *ID :* ${res.all[0].videoId}
➸ *Views :* ${res.all[0].views}
➸ *Durasi :* ${res.all[0].timestamp}

[WAIT] Proses Dumlu Yakan`
sendFileFromUrl(res.all[0].image, image, {quoted: Lan, caption: thumbInfo})
res = await y2mateA(res.all[0].url).catch(e => {
reply('Error')
})
sendFileFromUrl(res[0].link, audio, {quoted: Lan, mimetype: 'audio/mp4', filename: res[0].output})
                .catch((err) => {
                    sendMess(ownerNumber, 'YTPlay Error : ' + err)
                    console.log(color('[PLAYMP3]', 'red'), err)
					reply('Error!')
                })
break
                case 'tiktok':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}tiktok url`)
if(!isUrl(args[0]) && !args[0].includes('vt.tiktok.com')) return reply('Link tidak valid')
                reply(nad.wait())
                axios.get(`https://api.lolhuman.xyz/api/tiktok?apikey=YukinoApi&url=${body.slice(8)}`)
                .then(({data}) => {
                    let { title, description, duration, link } = data.result
                    let capt = `*「 TIKTOK DOWNLOAD 」*

➸ Judul : ${title}
➸ Username : ${data.result.author.username}
➸ Nickname : ${data.result.author.nickname}
➸ Duration : ${duration}
➸ Descripttion : ${description}
`
                    sendFileFromUrl(link, video, { mimetype: 'video/mp4', quoted: Lan })
                })
                .catch(() => {
                    axios.get(`https://api.lolhuman.xyz/api/tiktok2?apikey=YukinoApi&url=${body.slice(8)}`)
                    .then(({data}) => {
                        sendFileFromUrl(data.result, video, { mimetype: 'video/mp4', quoted: Lan })
                    })
                    .catch(() => {
                        axios.get(`https://api.lolhuman.xyz/api/tiktok3?apikey=YukinoApi&url=${body.slice(8)}`)
                        .then(({data}) => {
                        sendFileFromUrl(data.result, video, { mimetype: 'video/mp4', quoted: Lan })
                        })
                    .catch(() => {
                        axios.get(`https://toksaver.com/convertok?url=${body.slice(8)}`)
                        .then(({data}) => {
                        sendFileFromUrl(data.data.no_watermark, video, { mimetype: 'video/mp4', quoted: Lan })
                        })
                        .catch((err) => {
                            sendMess(ownerNumber, 'Tiktok Error : ' + err)
                            console.log(color('[Tiktok]', 'red'), err)
                            reply('Error!')
                        })
                    })
                })
              })
                break
                case 'tiktokmp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}tiktok url`)
if(!isUrl(args[0]) && !args[0].includes('vt.tiktok.com')) return reply('Link tidak valid')
                reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/tiktokmusic?apikey=YukinoApi&url=${body.slice(11)}`, audio, {mimetype: 'audio/mp4', quoted: Lan})
                .catch((err) => {
                sendMess(ownerNumber, 'Tiktok Mp3 Error : ' + err)
                console.log(color('[TTMP3]', 'red'), err)
                reply('Error')
                })
                break
                case 'instagram':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (args.length < 1) return reply(`Format salah! Ex : ${prefix}instagram url`)
if(!isUrl(args[0]) && !args[0].includes('instagram.com')) return reply('Link tidak valid')
                reply(nad.wait())
                axios.get(`https://api.zeks.xyz/api/ig?apikey=RamlanGans&url=${body.slice(11)}`)
                .then(({data}) => {
                let { url, type } = data.result[0]
                let ige = `*「 INSTAGRAM DOWNLOAD 」*

C A P T I O N
${data.caption}`
                if (type == 'jpg') {
                sendFileFromUrl(url, image, {quoted: Lan, caption: ige})// disini send image
                } else {
                sendFileFromUrl(url, video, { mimetype: 'video/mp4', quoted: Lan, caption: ige})// disni send video
                }
                })
                        .catch((err) => {
                sendMess(ownerNumber, 'Instagram Error : ' + err)
                console.log(color('[INSTAGRAM]', 'red'), err)
                reply('Error')
                })
                      break
				case 'makermenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const Laner = `「 *MAKER MENU* 」
╭─❒
│${a}❏ ${prefix}hartatahta${a}
│${a}❏ ${prefix}blueneon${a}
│${a}❏ ${prefix}hekertext${a}
│${a}❏ ${prefix}breakwall${a}
│${a}❏ ${prefix}embuntext${a}
│${a}❏ ${prefix}wolflogo${a}
│${a}❏ ${prefix}retrologo${a}
│${a}❏ ${prefix}firetext${a}
│${a}❏ ${prefix}sandwrite${a}
│${a}❏ ${prefix}epeplogo${a}
│${a}❏ ${prefix}yutubgold${a}
│${a}❏ ${prefix}yutubsilver${a}
│${a}❏ ${prefix}text3dbox${a}
│${a}❏ ${prefix}avengerslogo${a}
│${a}❏ ${prefix}pornhub${a}
│${a}❏ ${prefix}blackpink${a}
│${a}❏ ${prefix}thundername${a}
│${a}❏ ${prefix}glitchtext${a}
│${a}❏ ${prefix}coffetext${a}
│${a}❏ ${prefix}pubglogo${a}
│${a}❏ ${prefix}wooden3d
│${a}❏ ${prefix}textbyname
│${a}❏ ${prefix}writegalacy
│${a}❏ ${prefix}galaxybat
│${a}❏ ${prefix}snow3d
│${a}❏ ${prefix}birthdayday
│${a}❏ ${prefix}starsnight
│${a}❏ ${prefix}textcake
│${a}❏ ${prefix}glittergold
│${a}❏ ${prefix}noeltext
│${a}❏ ${prefix}metallogo
│${a}❏ ${prefix}greenbush
│${a}❏ ${prefix}glossychrome
│${a}❏ ${prefix}greenneon
│${a}❏ ${prefix}hologram3d
│${a}❏ ${prefix}galaxystyle
│${a}❏ ${prefix}birthdaycake
│${a}❏ ${prefix}heartshaped
│${a}❏ ${prefix}royaltext
│${a}❏ ${prefix}puppycute
│${a}❏ ${prefix}wetglass
│${a}❏ ${prefix}multicolor3d
│${a}❏ ${prefix}watercolor
│${a}❏ ${prefix}luxurygold
│${a}❏ ${prefix}galaxywallpaper
│${a}❏ ${prefix}lighttext
│${a}❏ ${prefix}beautifulflower
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(Laner)
					break
// LOL
				case 'coffetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Rara`)
					reply('[☕] Kopi 30.000 Ya Bruh')
					sendFileFromUrl(`https://api.lolhuman.xyz/api/photooxy1/coffe?apikey=YukinoApi&text=${q}`, image, {quoted: Lan, caption: 'Jangan lupa bayar'})
					.catch(() => reply('Error'))
					break
				case 'pubglogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pubglogo Alfa & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.lolhuman.xyz/api/photooxy2/pubg?apikey=Yukinoapi&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
                    // Ephoto 360 //
                case 'wetglass':
                case 'multicolor3d':
                case 'watercolor':
                case 'luxurygold':
                case 'galaxywallpaper':
                case 'lighttext':
                case 'beautifulflower':              
                case 'puppycute':
                case 'royaltext':
                case 'heartshaped':
                case 'birthdaycake':
                case 'galaxystyle':
                case 'hologram3d':
                case 'greenneon':                
                case 'glossychrome':
                case 'greenbush':
                case 'metallogo':
                case 'noeltext':
                case 'glittergold':
                case 'textcake':
                case 'starsnight':                
                case 'wooden3d':
                case 'textbyname':
                case 'writegalacy':
                case 'galaxybat':
                case 'snow3d':
                case 'birthdayday':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (args.length < 1) return reply(`Example: ${prefix + command} Rara`)
                    reply(nad.wait())
                    ini_txt = args.join(" ")
                    sendFileFromUrl(`https://api.lolhuman.xyz/api/ephoto1/${command}?apikey=YukinoApi&text=${ini_txt}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
// ZEKS
				case 'hartatahta':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hartatahta Rara`)
					reply('[❗] Hirti Tihti Tai Anjg :v')
					sendFileFromUrl(`https://api.zeks.xyz/api/hartatahta?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'blueneon':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blueneon Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/bneon?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break					
				case 'hekertext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}hekertext Alfa`)
					reply('[😱] Heker Ya Bwang?')
					sendFileFromUrl(`https://api.zeks.xyz/api/matrix?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'breakwall':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}breakwall Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/breakwall?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'embuntext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}embuntext Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/dropwater?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'wolflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}wolflogo Alfa & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/wolflogo?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'retrologo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(10)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					var teks3 = gh.split("&")[2];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}retrologo SmartBot & Alfa & Bottz`)
					axios.get(`https://api.zeks.xyz/api/retro?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}&text3=${teks3}`)
					.then(({data}) => {
					sendFileFromUrl(data.result, image, { quoted: Lan })
					})
					.catch(() => reply('Error'))
					break
				case 'firetext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}firetext Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/tfire?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'sandwrite':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}sandwrite Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/sandw?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'epeplogo':
				case 'fflogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}epeplogo Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/epep?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'yutubgold':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}yutubgold Alfa`)
					reply('[😱] Yutuber Bwang?')
					sendFileFromUrl(`https://api.zeks.xyz/api/gplaybutton?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'yutubsilver':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}yutubsilver Alfa`)
					reply('[😱] Yutuber Bwang?')
					sendFileFromUrl(`https://api.zeks.xyz/api/splaybutton?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'text3dbox':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}text3dbox Alfa`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/text3dbox?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'avengerslogo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(14)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}avengerslogo Alfa & Rara`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/logoaveng?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'pornhub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(9)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}pornhub Alfa & SmartBot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/phlogo?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'blackpink':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}blackpink Rara`)
					reply('[😱] Hah Blekping :v')
					sendFileFromUrl(`https://api.zeks.xyz/api/logobp?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break
				case 'thundername':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}thundername Rara`)
					reply('[❗] Wait Bro Pasti Kemren Neh...')
					sendFileFromUrl(`https://api.zeks.xyz/api/thundertext?apikey=${zeksapi}&text=${q}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break		
				case 'glitchtext':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(11)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (args.length < 1) return reply(`Teks Nya Mana Kak?\nContoh :\n${prefix}glitchtext Alfa & SmartBot`)
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/gtext?apikey=${zeksapi}&text1=${teks1}&text2=${teks2}`, image, {quoted: Lan})
					.catch(() => reply('Error'))
					break

				case 'gabutmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const gabut = `「 *GABUT MENU* 」
╭─❒
│${a}❏ ${prefix}tictactoe${a}
│${a}❏ ${prefix}delttc${a}
│${a}❏ ${prefix}tebakin${a}
│${a}❏ ${prefix}caklontong${a}
│${a}❏ ${prefix}family100${a}
│${a}❏ ${prefix}tebakanime${a}
│${a}❏ ${prefix}bisakah${a}
│${a}❏ ${prefix}kapankah${a}
│${a}❏ ${prefix}apakah${a}
│${a}❏ ${prefix}rate${a}
│${a}❏ ${prefix}hobby${a}
│${a}❏ ${prefix}truth${a}
│${a}❏ ${prefix}dare${a}
│${a}❏ ${prefix}cekbapak${a}
│${a}❏ ${prefix}seberapagay${a}
│${a}❏ ${prefix}jadian${a}
│${a}❏ ${prefix}ganteng${a}
│${a}❏ ${prefix}cantik${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(gabut)
					break
            case 'delttt':
            case 'delttc':
                if (!isGroup)return reply(nad.groupo())
                if (!isTicTacToe(from, tictactoe)) return reply(`Tidak ada sesi game tictactoe di grup ini`)
                tictactoe.splice(getPosTic(from, tictactoe), 1)
                reply(`Berhasil menghapus sesi tictactoe di grup ini`)
                break
					case 'tictactoe':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
                if (isTicTacToe(from, tictactoe)) return reply(`Masih ada game yg blum selesai`)
                if (args.length < 1) return reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                if (Lan.message.extendedTextMessage != undefined){
                    mentioned = Lan.message.extendedTextMessage.contextInfo.mentionedJid
                        mentions(monospace(`@${sender.split('@')[0]} menantang @${mentioned[0].split('@')[0]} untuk bermain TicTacToe\n\nKirim (Y/T) untuk bermain`), [sender, mentioned[0]], false)
                        tictactoe.push({
                            id: from,
                            status: null,
                            penantang: sender,
                            ditantang: mentioned[0],
                            taruhan: 0,
                            TicTacToe: ['1️⃣','2️⃣','3️⃣','4️⃣','5️⃣','6️⃣','7️⃣','8️⃣','9️⃣']
                        })
                } else {
                    reply(`Kirim perintah *${prefix}tictactoe* @tag`)
                }
                break
				case 'ganteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Cowok paling ganteng di group ini adalah\n*@${aku.jid.split('@')[0]}*`
					jds.push(aku.jid)
					mentions(tejs, jds, true)
					break
				case 'cantik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Cewek️ paling cantik di group ini adalah\n*@${cintax.jid.split('@')[0]}*`
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break
				case 'jadian':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					jds = []
					var kamu = groupMembers
					var cinta = groupMembers
					var aku = cinta[Math.floor(Math.random() * kamu.length)]
					var cintax = kamu[Math.floor(Math.random() * cinta.length)]
					tejs = `Ciee.. yang lagi jadian\n*@${aku.jid.split('@')[0]}* ♥️ *@${cintax.jid.split('@')[0]}*\nSemoga Langgeng Hii`
					jds.push(aku.jid)
					jds.push(cintax.jid)
					mentions(tejs, jds, true)
					break
				case 'seberapagay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
				anu = await fetchJson(`https://arugaz.herokuapp.com/api/howgay`, {method: 'get'})
				hasil = `Nih Liat Data Gay Si ${q}\n\n\nPersentase Gay : ${anu.persen}%\nAlert!!! : ${anu.desc}`
				reply(hasil)
				break
				case 'tebakin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (tebakgambar.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://api.zeks.xyz/api/tebakgambar?apikey=${zeksapi}`)
                    resu = anu.result
                    tebak = resu.soal
                    jawaban = resu.jawaban
                    tebakgambar[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                    console.log(jawaban)
                    tebakya = await getBuffer(tebak)
                    alfa.sendMessage(from, tebakya, image, { quoted: Lan, caption: "Jawab Ya! Gak Bisa Jawab Donasi:v" })
                   await sleep(30000)
                    if (tebakgambar.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete tebakgambar[sender.split('@')[0]]
                        fs.writeFileSync("./database/tebakgambar.json", JSON.stringify(tebakgambar))
                    }
                    break
				case 'caklontong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (caklontong.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://x-restapi.herokuapp.com/api/caklontong?apikey=BETA`)
                    tebakya = anu.soal
                    tebak = `PERTANYAAN : ${tebakya}`
                    jawaban = anu.jawaban
                    caklontong[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                    console.log(jawaban)
                    alfa.sendMessage(from, tebak, text, { quoted: Lan })
                   await sleep(30000)
                    if (caklontong.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete caklontong[sender.split('@')[0]]
                        fs.writeFileSync("./database/caklontong.json", JSON.stringify(caklontong))
                    }
                    break
				case 'family100':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (family.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://x-restapi.herokuapp.com/api/family100?apikey=BETA`)
                    tebakya = anu.soal
                    tebak = `PERTANYAAN : ${tebakya}`
                    jawaban = anu.jawaban
                    family[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                    console.log(jawaban)
                    alfa.sendMessage(from, tebak, text, { quoted: Lan })
                   await sleep(30000)
                    if (family.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete family[sender.split('@')[0]]
                        fs.writeFileSync("./database/family100.json", JSON.stringify(family))
                    }
                    break
				case 'tebakanime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    if (tebakanime.hasOwnProperty(sender.split('@')[0])) return reply("Jawab dulu yang tadi amsu")
                    anu = await fetchJson(`https://x-restapi.herokuapp.com/api/tebak-anime?apikey=BETA`)
                    tebak = anu.soal
                    jawaban = anu.jawaban
                    tebakanime[sender.split('@')[0]] = jawaban.toLowerCase()
                    fs.writeFileSync("./database/tebakanime.json", JSON.stringify(tebakanime))
                    console.log(jawaban)
                    tebakya = await getBuffer(tebak)
                    alfa.sendMessage(from, tebakya, image, { quoted: Lan, caption: "Jawab Ya! Gak Bisa Jawab Donasi:v" })
                   await sleep(30000)
                    if (tebakanime.hasOwnProperty(sender.split('@')[0])) {
                        reply("Jawaban: " + jawaban)
                        delete tebakanime[sender.split('@')[0]]
                        fs.writeFileSync("./database/tebakanime.json", JSON.stringify(tebakanime))
                    }
                    break
				case 'bisakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					bisakah = body.slice(1)
					const bisa = ['Tentu Saja Bisa! Kamu Adalah Orang Paling Homky', 'Gak Bisa Ajg Aowkwowk', 'Hmm Gua Gak Tau Yaa, tanya ama bapakau', 'Ulangi Tod Gua Ga Paham']
					const keh = bisa[Math.floor(Math.random() * bisa.length)]
					alfa.sendMessage(from, 'Pertanyaan : *' + bisakah + '*\n\nJawaban : ' + keh, text, { quoted: Lan })
					break
					case 'kapankah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					kapankah = body.slice(1)
					const kapan = ['Besok', 'Lusa', 'Tadi', '4 Hari Lagi', '5 Hari Lagi', '6 Hari Lagi', '1 Minggu Lagi', '2 Minggu Lagi', '3 Minggu Lagi', '1 Bulan Lagi', '2 Bulan Lagi', '3 Bulan Lagi', '4 Bulan Lagi', '5 Bulan Lagi', '6 Bulan Lagi', '1 Tahun Lagi', '2 Tahun Lagi', '3 Tahun Lagi', '4 Tahun Lagi', '5 Tahun Lagi', '6 Tahun Lagi', '1 Abad lagi', '3 Hari Lagi']
					const koh = kapan[Math.floor(Math.random() * kapan.length)]
					alfa.sendMessage(from, 'Pertanyaan : *' + kapankah + '*\n\nJawaban : ' + koh, text, { quoted: Lan })
					break

				case 'apakah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					apakah = body.slice(1)
					const apa = ['Iya', 'Tidak', 'Bisa Jadi', 'Ulangi bro gak paham']
					const kah = apa[Math.floor(Math.random() * apa.length)]
					alfa.sendMessage(from, 'Pertanyaan : *' + apakah + '*\n\nJawaban : ' + kah, text, { quoted: Lan })
					break

				case 'rate':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					rate = body.slice(1)
					const ra = ['4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39']
					const te = ra[Math.floor(Math.random() * ra.length)]
					alfa.sendMessage(from, 'Pertanyaan : *' + rate + '*\n\nJawaban : ' + te + '%', text, { quoted: Lan })
					break

				case 'hobby':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					hobby = body.slice(1)
					const hob = ['Desah Di Game', 'Ngocokin Doi', 'Stalking sosmed nya mantan', 'Kau kan gak punya hobby awokawok', 'Memasak', 'Membantu Atok', 'Mabar', 'Nobar', 'Sosmedtan', 'Membantu Orang lain', 'Nonton Anime', 'Nonton Drakor', 'Naik Motor', 'Nyanyi', 'Menari', 'Bertumbuk', 'Menggambar', 'Foto fotoan Ga jelas', 'Maen Game', 'Berbicara Sendiri']
					const by = hob[Math.floor(Math.random() * hob.length)]
					alfa.sendMessage(from, 'Pertanyaan : *' + hobby + '*\n\nJawaban : ' + by, text, { quoted: Lan })
					break

				case 'truth':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const trut = ['Pernah suka sama siapa aja? berapa lama?', 'Kalau boleh atau kalau mau, di gc/luar gc siapa yang akan kamu jadikan sahabat?(boleh beda/sma jenis)', 'apa ketakutan terbesar kamu?', 'pernah suka sama orang dan merasa orang itu suka sama kamu juga?', 'Siapa nama mantan pacar teman mu yang pernah kamu sukai diam diam?', 'pernah gak nyuri uang nyokap atau bokap? Alesanya?', 'hal yang bikin seneng pas lu lagi sedih apa', 'pernah cinta bertepuk sebelah tangan? kalo pernah sama siapa? rasanya gimana brou?', 'pernah jadi selingkuhan orang?', 'hal yang paling ditakutin', 'siapa orang yang paling berpengaruh kepada kehidupanmu', 'hal membanggakan apa yang kamu dapatkan di tahun ini', 'siapa orang yang bisa membuatmu sange', 'siapa orang yang pernah buatmu sange', '(bgi yg muslim) pernah ga solat seharian?', 'Siapa yang paling mendekati tipe pasangan idealmu di sini', 'suka mabar(main bareng)sama siapa?', 'pernah nolak orang? alasannya kenapa?', 'Sebutkan kejadian yang bikin kamu sakit hati yang masih di inget', 'pencapaian yang udah didapet apa aja ditahun ini?', 'kebiasaan terburuk lo pas di sekolah apa?']
					const ttrth = trut[Math.floor(Math.random() * trut.length)]
					truteh = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					alfa.sendMessage(from, truteh, image, { caption: '*Truth*\n\n' + ttrth, quoted: Lan })
					break

				case 'dare':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const dare = ['Kirim pesan ke mantan kamu dan bilang "aku masih suka sama kamu', 'telfon crush/pacar sekarang dan ss ke pemain', 'pap ke salah satu anggota grup', 'Bilang "KAMU CANTIK BANGET NGGAK BOHONG" ke cowo', 'ss recent call whatsapp', 'drop emot 🤥 setiap ngetik di gc/pc selama 1 hari', 'kirim voice note bilang can i call u baby?', 'drop kutipan lagu/quote, terus tag member yang cocok buat kutipan itu', 'pake foto sule sampe 3 hari', 'ketik pake bahasa daerah 24 jam', 'ganti nama menjadi "gue anak lucinta luna" selama 5 jam', 'chat ke kontak wa urutan sesuai %batre kamu, terus bilang ke dia "i lucky to hv you', 'prank chat mantan dan bilang " i love u, pgn balikan', 'record voice baca surah al-kautsar', 'bilang "i hv crush on you, mau jadi pacarku gak?" ke lawan jenis yang terakhir bgt kamu chat (serah di wa/tele), tunggu dia bales, kalo udah ss drop ke sini', 'sebutkan tipe pacar mu!', 'snap/post foto pacar/crush', 'teriak gajelas lalu kirim pake vn kesini', 'pap mukamu lalu kirim ke salah satu temanmu', 'kirim fotomu dengan caption, aku anak pungut', 'teriak pake kata kasar sambil vn trus kirim kesini', 'teriak " anjimm gabutt anjimmm " di depan rumah mu', 'ganti nama jadi " BOWO " selama 24 jam', 'Pura pura kerasukan, contoh : kerasukan maung, kerasukan belalang, kerasukan kulkas, dll']
					const der = dare[Math.floor(Math.random() * dare.length)]
					tod = await getBuffer(`https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg`)
					alfa.sendMessage(from, tod, image, { quoted: Lan, caption: '*Dare*\n\n' + der })
					break

				case 'cekbapak': // By Ramlan ID
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const bapak = ['Wah Mantap Lu Masih Punya Bapack\nPasti Bapack Nya Kuli :v\nAwowkwokwwok\n#CandabOs', 'Aowkwwo Disini Ada Yteam :v\nLu Yteam Bro? Awowkwowk\nSabar Bro Ga Punya Bapack\n#Camda', 'Bjir Bapack Mu Ternyata Sudah Cemrai\nSedih Bro Gua Liatnya\nTapi Nih Tapi :v\nTetep Ae Lu Yteam Aowkwowkw Ngakak :v', 'Jangan #cekbapak Mulu Broo :v\nKasian Yang Yteam\nNtar Tersinggung Kan\nYahahaha Hayyuk By : Alfa']
					const cek = bapak[Math.floor(Math.random() * bapak.length)]
					alfa.sendMessage(from, cek, text, { quoted: Lan })
					break

				case 'randommenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const random = `「 *RANDOM MENU* 」
╭─❒
│${a}❏ ${prefix}gachacewek${a}
│${a}❏ ${prefix}gachacowok${a}
│${a}❏ ${prefix}megumin${a}
│${a}❏ ${prefix}sagiri${a}
│${a}❏ ${prefix}waifu${a}
│${a}❏ ${prefix}shinobu${a}
│${a}❏ ${prefix}loli${a}
│${a}❏ ${prefix}nekonime${a}
│${a}❏ ${prefix}darkjokes${a}
│${a}❏ ${prefix}meme${a}
│${a}❏ ${prefix}estetik${a}
│${a}❏ ${prefix}citacita${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(random)
					break
				case 'gachacewek':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/cewek.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Bwang?:v')
					break
					case 'citacita':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchText('https://raw.githubusercontent.com/AlvioAdjiJanuar/citacita/main/citacita.txt')
					    .then(async (oh) => {
                        const cita = oh.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        citata = await getBuffer(randomCita)
                        alfa.sendMessage(from, citata, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
                    })
                    .catch(async (err) => {
                        reply('Error!')
                    })
                    break
					

				case 'gachacowok':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/cowok.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, 'Jadi Gimana Mba?:v')
					break

				case 'meme':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchJson(`https://api.zeks.xyz/api/memeindo?apikey=${zeksapi}`)
					reply(nad.wait())
					mimi = await getBuffer(anu.result)
					alfa.sendMessage(from, mimi, image, { quoted: Lan })
					break

				case 'darkjokes':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					data = fs.readFileSync('./R4ML4N/darkjokes.js');
					jsonData = JSON.parse(data);
					randIndex = Math.floor(Math.random() * jsonData.length);
					randKey = jsonData[randIndex];
					hasil = await getBuffer(randKey.result)
					sendImage(hasil, Lan, '*GELAP BOS :V*')
					break
//------------------< VVIBU >-------------------
            case 'waifu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/waifu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nekonime':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/neko')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'megumin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/megumin')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'shinobu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/sfw/shinobu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'loli':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/random/loli?apikey=YukinoApi`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
            case 'sagiri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                sendFileFromUrl(`https://api.lolhuman.xyz/api/random/sagiri?apikey=YukinoApi`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
				case 'estetik':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
					sendFileFromUrl(`https://api.zeks.xyz/api/estetikpic?apikey=${zeksapi}`, image, {quoted: Lan})
                .catch(() => reply('Error!'))
                break
				
				case 'nsfwmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const enes = `「 *NSFW MENU* 」
╭─❒
│${a}❏ ${prefix}randomhentong${a}
│${a}❏ ${prefix}waifuhentai${a}
│${a}❏ ${prefix}nsfwneko${a}
│${a}❏ ${prefix}nsfwtrap${a}
│${a}❏ ${prefix}nsfwblowjob${a}
│${a}❏ ${prefix}kemonomimi${a}
│${a}❏ ${prefix}nsfwkitsune${a}
│${a}❏ ${prefix}nsfwyuri${a}
│${a}❏ ${prefix}nsfwboobs${a}
│${a}❏ ${prefix}nsfwkuni${a}
│${a}❏ ${prefix}doujin${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(enes)
					break
// HENTAI 
            case 'randomhentong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					if (!isPrem) return reply(nad.premium(prefix))
					reply(nad.wait())
					axios.get('http://api-melodicxt-3.herokuapp.com/api/random/hentai?apiKey=administrator')
					.then(({data}) => {
					let { result } = data.result
						sendFileFromUrl(result, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'doujin':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					if (!isPrem) return reply(nad.premium(prefix))
					if (args.length < 1) return reply(`Format salah! Ex : ${prefix}doujin 344253`)
					reply(nad.wait())
					axios.get(`https://api.lolhuman.xyz/api/nhentaipdf/${body.slice(9)}?apikey=YukinoApi`)
					.then(({data}) => {
					sendFileFromUrl(data.result, document, {quoted: Lan, mimetype: 'application/pdf', filename: `${body.slice(9)}.pdf`})
						})
						.catch(() => reply('Error!'))
                      break
            case 'waifuhentai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/waifu')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwneko':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/neko')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwtrap':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/trap')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
            case 'nsfwblowjob':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
						axios.get('https://waifu.pics/api/nsfw/blowjob')
						.then(({data}) => {
						sendFileFromUrl(data.url, image, {quoted: Lan})
						})
						.catch(() => reply('Error!'))
                      break
// END								
					case 'kemonomimi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kemonomimi-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					case 'nsfwkitsune':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kitsune-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break

					case 'nsfwyuri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/yuri-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					
					case 'nsfwboobs':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/boobs-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
					case 'nsfwkuni':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isGroup) return reply(nad.groupo())
					if (!isNsfw) return reply(nad.nsfwoff())
					reply(nad.wait())
					axios.get(`https://x-restapi.herokuapp.com/api/kuni-nsfw?apikey=BETA`)
					.then(({data}) => {
					sendFileFromUrl (data.url, image, {quoted: Lan, caption: 'Jangan Comly um'})
						})
						.catch(() => reply('Error!'))
                      break
				case 'toolsmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const tools = `「 *TOOLS MENU* 」
╭─❒
│${a}❏ ${prefix}webdav <url>${a}
│${a}❏ ${prefix}fakedeface url|tittle|desc${a}
│${a}❏ ${prefix}nmap <optional>${a}
│${a}❏ ${prefix}dork <optional>${a}
│${a}❏ ${prefix}tomp3${a}
│${a}❏ ${prefix}tomp4${a}
│${a}❏ ${prefix}toptt${a}
│${a}❏ ${prefix}toimg${a}
│${a}❏ ${prefix}imgtourl${a}
│${a}❏ ${prefix}trigered${a}
│${a}❏ ${prefix}komenyt${a}
│${a}❏ ${prefix}nightcore${a}
│${a}❏ ${prefix}slow${a}
│${a}❏ ${prefix}tupai${a}
│${a}❏ ${prefix}blub${a}
│${a}❏ ${prefix}gemuk${a}
│${a}❏ ${prefix}ghost${a}
│${a}❏ ${prefix}bass${a}
│${a}❏ ${prefix}makecalender${a}
│${a}❏ ${prefix}beautiful${a}
│${a}❏ ${prefix}greyscale${a}
│${a}❏ ${prefix}shit${a}
│${a}❏ ${prefix}blur${a}
│${a}❏ ${prefix}gay${a}
│${a}❏ ${prefix}sampah${a}
│${a}❏ ${prefix}wanted${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(tools)
					break
					case 'shit':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/shit?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'greyscale':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/greyscale?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'blur':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/pixelate?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'sampah':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/trash?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'beautiful':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/beautiful?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'wanted':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/wanted?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
					case 'gay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api-self.herokuapp.com/api/gay?url=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break										
					case 'makecalender':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						zbuf = await getBuffer(`https://api.zeks.xyz/api/calender?apikey=${zeksapi}&image=${trig}`)
						alfa.sendMessage(from, zbuf, image, {quoted: Lan})
					} else {
						reply('Reply Foto Nya Kak')
					}
					break
				case 'webdav':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					exec(`curl -T ./DEPES/index.html ${q}`, (err, stdout) => {
						if (err) return fakestatus(`root@alfa~# ${err}`)
						if (stdout) {
						}
						fakestatus(`root@alfa~# Success Uploading to ${q}`)
					})
					break
				case 'fakedeface':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var nn = body.slice(12)
					var urlnye = nn.split("|")[0];
					var titlenye = nn.split("|")[1];
					var descnye = nn.split("|")[2];
					imgbbb = require('imgbb-uploader')
					run = getRandom('.jpeg')
					encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ddatae = await imageToBase64(JSON.stringify(media).replace(/\"/gi, ''))

					alfa.sendMessage(from, {

						text: `${urlnye}`,

						matchedText: `${urlnye}`,

						canonicalUrl: `${urlnye}`,

						description: `${descnye}`,

						title: `${titlenye}`,

						jpegThumbnail: ddatae
					}, 'extendedTextMessage', { detectLinks: false })
					break
				case 'dork':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					try {
						fakestatus(`Otw...`)
						anudorkw2 = await fetchJson(`https://api-anoncybfakeplayer.herokuapp.com/dorking?dork=${q}`, { method: 'get' })
						hasildork = `${anudorkw2.result}`
						fakestatus(hasildork)
					} catch (err) {
						fakestatus(`Error: ${err}`)
					}
					break
					case 'nmap':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!q) return fakestatus('Format Salah')
					exec(`nmap ${q}`, (err, stdout) => {
						if (err) return fakestatus(`root@alfa~# ${err}`)
						if (stdout) {
							fakestatus(`root@alfa~# ${stdout}`)
						}
					})
					break
				case 'tomp3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					alfa.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('Reply Video Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal Kak Coba Ulangi:)')
						mhee = fs.readFileSync(ran)
						alfa.sendMessage(from, mhee, audio, { mimetype: 'audio/mp4', quoted: Lan })
						fs.unlinkSync(ran)
						//await sleep(2000)
					})
					break

				case 'toimg':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isQuotedSticker) return reply('Reply Sticker Nya Kak')
					reply(nad.wait())
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply(nad.stikga())
						buffer = fs.readFileSync(ran)
						alfa.sendMessage(from, buffer, image, { quoted: Lan, caption: 'nih kak [(^.^)]' })
						fs.unlinkSync(ran)
					})
					break

                case 'tomp4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					reply(nad.wait())
                    var imgbb = require('imgbb-uploader')
                    if ((isMedia && !Lan.message.videoMessage || isQuotedSticker) && args.length == 0) {
                        ger = isQuotedSticker ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
                        owgi = await alfa.downloadAndSaveMediaMessage(ger)
                        data = await imgbb(`${keybb}`, owgi)
                        axios.get(`https://ezgif.com/webp-to-mp4?url=${data.display_url}`)
                            .then(({ data }) => {
                                $ = cheerio.load(data)
                                bodyFormThen = new FormData()
                                file = $('input[name="file"]').attr('value')
                                token = $('input[name="token"]').attr('value')
                                convert = $('input[name="file"]').attr('value')
                                gotdata = {
                                    file: file,
                                    token: token,
                                    convert: convert
                                }
                                bodyFormThen.append('file', gotdata.file)
                                bodyFormThen.append('token', gotdata.token)
                                bodyFormThen.append('convert', gotdata.convert)
                                axios({
                                    method: 'post',
                                    url: 'https://ezgif.com/webp-to-mp4/' + gotdata.file,
                                    data: bodyFormThen,
                                    headers: {
                                        'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
                                    }
                                }).then(({ data }) => {
                                    $ = cheerio.load(data)
                                    result = 'https:' + $('div#output > p.outfile > video > source').attr('R4ML4N')
                                    getBuffer(result).then(tog => {
                                        alfa.sendMessage(from, tog, video, { mimetype: 'video/mp4', quoted: Lan })
                                    })
                                })
                            })
                    } else {
                        reply('Reply StickerGif nya!')
                    }
                    break
                    
				case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					var media = await alfa.downloadAndSaveMediaMessage(encmedia)
					var imgbb = require('imgbb-uploader')
					imgbb(`${keybb}`, media)
						.then(data => {
							var caps = `「 *IMAGE TO URL* 」
➸ ID : ${data.id}
➸ MimeType : ${data.image.mime}
➸ Extension : ${data.image.extension}
➸ URL : ${data.display_url}`
							ibb = fs.readFileSync(media)
							alfa.sendMessage(from, ibb, image, { quoted: Lan, caption: caps })
						})
						.catch(err => {
							throw err
						})
					break
/*            case 'imgtourl':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					costum('[WAIT] Sabar Kak', text, tescuk, cr)
					var encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
					var media = await alfa.downloadAndSaveMediaMessage(encmedia)
                    const linkImg = await uploadImages(media, `${sender}_img`)
                    reply(linkImg)
            break*/
				case 'komenyt':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					gh = body.slice(9)
					usnm = gh.split("&")[0];
					cmn = gh.split("&")[1];
					var imgbb = require('imgbb-uploader')
					try {
						pp = await alfa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
					} catch {
						pp = 'https://i.ibb.co/zJ6dsYX/thumbnail.jpg'
					}
					media = await getBuffer(pp)
					datae = await imageToBase64(JSON.stringify(pp).replace(/\"/gi, ''))
					fs.writeFileSync('getpp.jpeg', datae, 'base64')
					res = await imgbb(`${keybb}`, 'getpp.jpeg')
					buffer = await getBuffer(`https://some-random-api.ml/canvas/youtube-comment?avatar=${res.display_url}&comment=${cmn}&username=${usnm}`)
					alfa.sendMessage(from, buffer, image, { caption: 'Nih Cok', contextInfo: { participant: '0@s.whatsapp.net', quotedMessage: { conversation: '*_YOUTUBE COMMENT_*' } } })
					break

				case 'trigered':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					var imgbb = require('imgbb-uploader')
					if ((isMedia && !Lan.message.videoMessage || isQuotedImage) && args.length == 0) {
						ger = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						reply(nad.wait())
						owgi = await alfa.downloadAndSaveMediaMessage(ger)
						anu = await imgbb(`${keybb}`, owgi)
						trig = `${anu.display_url}`
						ranp = getRandom('.gif')
						rano = getRandom('.webp')
						anu1 = `https://some-random-api.ml/canvas/triggered?avatar=${trig}`
						exec(`wget ${anu1} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
							fs.unlinkSync(ranp)
							if (err) return reply('GAGAL UM')
							nobg = fs.readFileSync(rano)
							alfa.sendMessage(from, nobg, sticker, { quoted: Lan })
							fs.unlinkSync(rano)
						})
					} else {
						reply('Gunakan Foto Kakm')
					}
					break
			    case 'nightcore':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())			    
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a atempo=1.06,asetrate=44100*1.25 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'slow':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.7,asetrate=44100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'tupai':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.5,asetrate=65100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'blub':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=0.9,asetrate=95100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'gemuk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=22100" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
				case 'ghost':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())				
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -filter:a "atempo=1.6,asetrate=3486" ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						ghs = fs.readFileSync(ran)
					alfa.sendMessage(from, ghs, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					    })
				       break
		       case 'bass':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())		   
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=64:width_type=o:width=2:g=56 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
					alfa.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						fs.unlinkSync(ran)
					   })
				       break
	             case 'toptt':
	                 if (!isQuotedAudio) return reply('Reply audio nya om')
					encmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('Gagal mengkonversi audio ke ptt')
						topt = fs.readFileSync(ran)
					alfa.sendMessage(from, topt, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
						})
						await limitAdd(sender)
					    break
				case 'mutualmenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const mtal = `「 *MUTUAL MENU* 」
${a}❏ ${prefix}mutual${a}
${a}❏ ${prefix}next${a}

「 *${botName}* 」`
					fakestatus(mtal)
					break
				case 'mutual':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break

				case 'next':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (isGroup) return reply('Maaf Kak Tidak Bisa Di Group')
					anug = getRegisteredRandomId(_registered).replace('@s.whatsapp.net', '')
					await reply('Mencari Pasangan >_<')
					await reply(`wa.me/${anug}`)
					await reply(`Pasangan Ditemukan :\n*${prefix}next* — Temukan Pasangan Baru`)
					break
					
				case 'othermenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const other = `「 *OTHER MENU* 」
╭─❒
│${a}❏ ${prefix}take author | packname${a}
│${a}❏ ${prefix}stalkgh${a}
│${a}❏ ${prefix}brainly${a}
│${a}❏ ${prefix}wiki${a}
│${a}❏ ${prefix}kbbi${a}
│${a}❏ ${prefix}ytstalk${a}
│${a}❏ ${prefix}pinterest${a}
│${a}❏ ${prefix}googleimage${a}
│${a}❏ ${prefix}jadwalsholat${a}
│${a}❏ ${prefix}artijodoh${a}
│${a}❏ ${prefix}artinama${a}
│${a}❏ ${prefix}artimimpi${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(other)
					break
					case 'artimimpi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artimimpi ular`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/artimimpi?apikey=${zeksapi}&q=${body.slice(11)}`)
					mimpi = anu.result
					apasi = `「 *ARTI MIMPI* 」\n\n<${mimpi.string}`
					reply(apasi)
					break
					case 'artinama':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artinama Alfa`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/artinama?apikey=${zeksapi}&nama=${body.slice(10)}`)
					apasii = `「 *ARTI NAMA* 」\n\n${anu.result}`
					reply(apasii)
					break
					case 'artijodoh':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					var gh = body.slice(11)
					var teks1 = gh.split("&")[0];
					var teks2 = gh.split("&")[1];
					if (!q) return reply(`Masukan nama!\nContoh :\n${prefix}artijodoh Alfa & Cewek`)
					anu = await fetchJsom(`https://api.zeks.xyz/api/primbonjodoh?apikey=${zeksapi}&nama1=${teks1}&nama2=${teks2}`)
					jodoh = anu.result
					apasiii = `「 *ARTI JODOH* 」\n\nKecocokan pasangan!\nNama kamu : ${jodoh.nama1}\nPasangan kamu : ${jodoh.nama2}\n\nPOSITIF : ${jodoh.positif}\nNEGATIF : ${jodoh.negatif}`
					zbuf = await getBuffer(jodoh.thumb)
					alfa.sendMessage(from, zbuf, image, {quoted: Lan, caption: apasiii})
					break
				case 'ytstalk':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gatauda = body.slice(9)
					anu = await fetchJson(`https://api.zeks.xyz/api/ytchannel?apikey=${zeksapi}&q=${body.slice(9)}`)
					reply(nad.wait())
					yts = `「 *YT STALKING* 」
➸ Nama Channel : ${anu.result[0].title}
➸ ID Channel : ${anu.result[0].id}
➸ Subscriber : ${anu.result[0].subscriber_count}
➸ Bio Channel : ${anu.result[0].description}
➸ Total Video : ${anu.result[0].video_count}`
					ytst = await getBuffer(anu.result[0].thumbnail)
					alfa.sendMessage(from, ytst, image, { quoted: Lan, caption: yts })
					break
case 'googleimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
if (!q) return reply(`Format salah!\nContoh :\n${prefix}googleimage hacker`)
reply(nad.wait())
teks = args.join(' ')
res = await googleImage(teks, google)
function google(error, result){
if (error){ return reply('Gambar tidak ditemukan')}
else {
var gugIm = result
var gugeli =  gugIm[Math.floor(Math.random() * gugIm.length)].url
alfa.sendMessage(from, gugeli, image, {quoted: Lan})
}
}
break
               case 'stalkgh': 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					anu = await fetchJson(`https://x-restapi.herokuapp.com/api/github-stalk?username=${q}&apikey=BETA`)
					reply(nad.wait())
					ghc = `「 *GITHUB STALKING* 」
➸ Username : ${anu.username}
➸ ID : ${anu.result.id}
➸ Followers : ${anu.follower}
➸ Following : ${anu.following}
➸ Repo : ${anu.countrepo}
➸ Deskripsi : ${anu.bio}`
					ghg = await getBuffer(anu.avatar)
					alfa.sendMessage(from, ghg, image, {quoted: Lan, caption: ghc})
					break
				case 'brainly':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(9)
					brainly(`${brien}`).then(res => {
						teks = '♡───────────♡\n'
						for (let Y of res.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.pertanyaan}\n\n*➸ Jawaban:* ${Y.jawaban[0].text}\n♡───────────♡\n`
						}
						alfa.sendMessage(from, teks, text, { quoted: Lan, detectLinks: false })
						console.log(res)
					})
					break
					
				case 'brain':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}brainly apa itu penis`)
					await limitAdd(sender)
					brien = body.slice(7)
					anu = await fetchJson(`https://api.zeks.xyz/api/brainly?apikey=${zeksapi}&q=${brien}&count=10`)
						teks = '♡───────────♡\n'
						for (let Y of anu.data) {
							teks += `\n*「 BRAINLY 」*\n\n*➸ Pertanyaan:* ${Y.question}\n\n*➸ Jawaban:* ${Y.answer[0].text}\n♡───────────♡\n`
						}
						alfa.sendMessage(from, teks, text, { quoted: Lan, detectLinks: false })
					break

				case 'wiki':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}wiki online`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/wiki?apikey=${zeksapi}&q=${body.slice(6)}`)
					reply('[WAIT] Sedang Searching...')
					wikiped = `「 WIKI PEDIA 」\n Jawaban : ${anu.result.result}`
					alfa.sendMessage(from, wikiped, text, { quoted: Lan })
					break

				case 'kbbi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Yang Mau Dicari Apa Kak?\nContoh :\n${prefix}kbbi manusia`)
					var bby = body.slice(6)
					anu = await fetchJson(`https://api.zeks.xyz/api/kbbi?apikey=${zeksapi}&q=${body.slice(6)}`)
					reply('[WAIT] Sedang Searching...')
					kabebei = `「 *KBBI* 」\nJawaban : ${anu.result}`
					alfa.sendMessage(from, kabebei, text, { quoted: Lan })
					break
					
				case 'pinterest':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					alfa.updatePresence(from, Presence.composing)
					data = await fetchJson(`https://api.zeks.xyz/api/pinimg?apikey=${zeksapi}&q=${q}`, { method: 'get' })
					ahu = data.data
					reply(nad.wait())
					n = JSON.parse(JSON.stringify(ahu));
					nimek = n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					alfa.sendMessage(from, pok, image, { quoted: Lan, caption: `*PINTEREST*` })
					break
					case 'jadwalsholat':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!q) return reply(`Daerah Nya Mana?\nContoh :\n${prefix}jadwalsholat Tasikmalaya`)
					anu = await fetchJson(`https://api.zeks.xyz/api/jadwalsholat?apikey=${zeksapi}&daerah=${q}`)
					jsholat = `${anu.data.string}`
					alfa.sendMessage(from, jsholat, text, {quoted: Lan})
					break

				case 'storagemenu':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					const storage = `「 *STORAGE* 」
╭─❒
│${a}❏ ${prefix}addstiker${a}
│${a}❏ ${prefix}getstiker${a}
│${a}❏ ${prefix}liststiker${a}
│${a}❏ ${prefix}addvideo${a}
│${a}❏ ${prefix}getvideo${a}
│${a}❏ ${prefix}listvideo${a}
│${a}❏ ${prefix}addvn${a}
│${a}❏ ${prefix}getvn${a}
│${a}❏ ${prefix}listvn${a}
│${a}❏ ${prefix}addimage${a}
│${a}❏ ${prefix}getimage${a}
│${a}❏ ${prefix}listimage${a}
│${a}❏ ${prefix}iri${a}
│${a}❏ ${prefix}pale${a}
│${a}❏ ${prefix}pota${a}
│${a}❏ ${prefix}welot${a}
│${a}❏ ${prefix}alay${a}
│${a}❏ ${prefix}bernyanyi${a}
│${a}❏ ${prefix}bwa${a}
│${a}❏ ${prefix}ganteng${a}
│${a}❏ ${prefix}gatal${a}
│${a}❏ ${prefix}ladida${a}
│${a}❏ ${prefix}rusher${a}
│${a}❏ ${prefix}boong${a}
│${a}❏ ${prefix}tengteng${a}
│${a}❏ ${prefix}sound1${a}
│${a}❏ ${prefix}sound2${a}
│${a}❏ ${prefix}sound3${a}
│${a}❏ ${prefix}sound4${a}
│${a}❏ ${prefix}sound5${a}
│${a}❏ ${prefix}sound6${a}
│${a}❏ ${prefix}sound7${a}
╰─────────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(storage)
					break
				case 'addstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedSticker) return reply('Reply stickernya kak -_-')
					stiklan = body.slice(11)
					if (!stiklan) return reply('Namain Stickernya kak!')
					adds = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					lan = await alfa.downloadMediaMessage(adds)
					setimker.push(`${stiklan}`)
					fs.writeFileSync(`./media/sticker/${stiklan}.webp`, lan)
					fs.writeFileSync(`./media/stik.json`, JSON.stringify(setimker))
					await reply('Sticker Berhasil Ditambahkan Ke Database Bot')
					break

				case 'getstiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Stiker Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}liststiker`)
					stikeram = body.slice(11)
					hasilya = fs.readFileSync(`./media/sticker/${stikeram}.webp`)
					alfa.sendMessage(from, hasilya, sticker, { quoted: Lan })
					break

				case 'liststiker':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lis = '╭──「 *LIST STICKER* 」\n'
					for (let cieee of setimker) {
						lis += `◯ ${cieee}\n`
					}
					lis += `\n╰─────「 *${setimker.length}* 」`
					alfa.sendMessage(from, lis.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": setimker } })
					break

				case 'addvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedVideo) return reply('Reply Videonya Kak')
					adv = body.slice(10)
					if (!adv) return reply('Namain video nya kak')
					deo = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					dvi = await alfa.downloadMediaMessage(deo)
					vidioya.push(`${adv}`)
					fs.writeFileSync(`./media/video/${adv}.mp4`, dvi)
					fs.writeFileSync(`./media/video.json`, JSON.stringify(vidioya))
					alfa.sendMessage(from, `Video Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Video Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvideo`)
					getvi = body.slice(10)
					buffer = fs.readFileSync(`./media/video/${getvi}.mp4`)
					alfa.sendMessage(from, buffer, video, { mimetype: 'video/mp4', quoted: Lan })
					break

				case 'listvideo':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					list = '╭──「 *LIST VIDEO* 」\n'
					for (let nihh of vidioya) {
						list += `◯ ${nihh}\n`
					}
					list += `\n╰─────「 *${vidioya.length}* 」`
					alfa.sendMessage(from, list.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": vidioya } })
					break

				case 'addvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedAudio) return reply('Reply Vn Nya Kak')
					advn = body.slice(7)
					if (!advn) return reply('Nama vn nya apa?')
					boij = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					delb = await alfa.downloadMediaMessage(boij)
					audioya.push(`${advn}`)
					fs.writeFileSync(`./media/audio/${advn}.mp3`, delb)
					fs.writeFileSync('./media/audio.json', JSON.stringify(audioya))
					alfa.sendMessage(from, `Vn Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Vn Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listvn`)
					namastc = body.slice(7)
					buffer = fs.readFileSync(`./media/audio/${namastc}.mp3`)
					alfa.sendMessage(from, buffer, audio, { mimetype: 'audio/mp4', quoted: Lan, ptt: true })
					break

				case 'listvn':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lisv = '╭──「 *LIST VN* 」\n'
					for (let awokwkwk of audioya) {
						lisv += `◯ ${awokwkwk}\n`
					}
					lisv += `\n╰─────「 *${audioya.length}* 」`
					alfa.sendMessage(from, lisv.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": audioya } })
					break

				case 'addimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (!isPrem) return reply(nad.premium(prefix))
					if (!isQuotedImage) return reply('Reply Gambar Nya Kak')
					sepimg = body.slice(10)
					if (!sepimg) return reply('Nama Gambar Nya Apa?')
					svimeg = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					imej = await alfa.downloadMediaMessage(svimeg)
					imegya.push(`${sepimg}`)
					fs.writeFileSync(`./media/image/${sepimg}.jpeg`, imej)
					fs.writeFileSync('./media/image.json', JSON.stringify(imegya))
					alfa.sendMessage(from, `Gambar Berhasil Ditambahkan Ke Database Bot`, MessageType.text, { quoted: Lan })
					break

				case 'getimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					if (args.length < 1) return reply(`Nama Gambar Nya Apa kak?\nKalo Gak Tau Ketik :\n${prefix}listimage`)
					namastc = body.slice(10)
					buffer = fs.readFileSync(`./media/image/${namastc}.jpeg`)
					alfa.sendMessage(from, buffer, image, { quoted: Lan })
					break

				case 'listimage':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lisi = '╭──「 *LIST IMAGE* 」\n'
					for (let menghilih of imegya) {
						lisi += `◯ ${menghilih}\n`
					}
					lisi += `\n╰─────「 *${imegya.length}* 」`
					alfa.sendMessage(from, lisi.trim(), extendedText, { quoted: Lan, contextInfo: { "mentionedJid": imegya } })
					break
				case 'iri':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					irim = fs.readFileSync('./media/dj/iri.mp3');
					alfa.sendMessage(from, irim, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pale':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					pal = fs.readFileSync('./media/dj/pale.mp3');
					alfa.sendMessage(from, pal, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'pota':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					pot = fs.readFileSync('./media/dj/pota.mp3');
					alfa.sendMessage(from, pot, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'welot':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					wel = fs.readFileSync('./media/dj/welot.mp3');
					alfa.sendMessage(from, wel, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'alay':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ala = fs.readFileSync('./media/dj/alay.mp3');
					alfa.sendMessage(from, ala, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bernyanyi':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ber = fs.readFileSync('./media/dj/bernyanyi.mp3');
					alfa.sendMessage(from, ber, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'bwa':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					bw = fs.readFileSync('./media/dj/bwa.mp3');
					alfa.sendMessage(from, bw, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ganteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					gan = fs.readFileSync('./media/dj/ganteng.mp3');
					alfa.sendMessage(from, gan, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'gatal':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					ga = fs.readFileSync('./media/dj/gatal.mp3');
					alfa.sendMessage(from, ga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'ladida':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lada = fs.readFileSync('./media/dj/ladadida.mp3');
					alfa.sendMessage(from, lada, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'rusher':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					rus = fs.readFileSync('./media/dj/rusher.mp3');
					alfa.sendMessage(from, rus, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'boong':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					boo = fs.readFileSync('./media/dj/tb.mp3');
					alfa.sendMessage(from, boo, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'tengteng':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					teng = fs.readFileSync('./media/dj/tengteng.mp3');
					alfa.sendMessage(from, teng, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound1':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					satu = fs.readFileSync('./media/music/sound1.mp3');
					alfa.sendMessage(from, satu, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound2':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					dua = fs.readFileSync('./media/music/sound2.mp3');
					alfa.sendMessage(from, dua, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound3':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					tiga = fs.readFileSync('./media/music/sound3.mp3');
					alfa.sendMessage(from, tiga, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound4':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					empat = fs.readFileSync('./media/music/sound4.mp3');
					alfa.sendMessage(from, empat, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound5':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					lima = fs.readFileSync('./media/music/sound5.mp3');
					alfa.sendMessage(from, lima, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound6':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					enam = fs.readFileSync('./media/music/sound6.mp3');
					alfa.sendMessage(from, enam, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break

				case 'sound7':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
					tujuh = fs.readFileSync('./media/music/sound7.mp3');
					alfa.sendMessage(from, tujuh, MessageType.audio, { quoted: Lan, mimetype: 'audio/mp4', ptt: true })
					break
				case 'ownermenu':
					const bosnya = `「 *MENU BOSS* 」
╭─❒
│${a}❏ ${prefix}addprem${a}
│${a}❏ ${prefix}dellprem${a}
│${a}❏ ${prefix}ban${a}
│${a}❏ ${prefix}unban${a}
│${a}❏ ${prefix}addbadword${a}
│${a}❏ ${prefix}delbadword${a}
│${a}❏ ${prefix}badwordlist${a}
│${a}❏ ${prefix}bc${a}
│${a}❏ ${prefix}setreply${a}
│${a}❏ ${prefix}setprefix${a}
│${a}❏ ${prefix}setbio${a}
│${a}❏ ${prefix}setppbot${a}
│${a}❏ ${prefix}setthumb${a}
│${a}❏ ${prefix}setexif author | packname${a}
│${a}❏ ${prefix}colong${a}
│${a}❏ ${prefix}clearall${a}
│${a}❏ ${prefix}event${a}
│${a}❏ ${prefix}term${a}
│${a}❏ ${prefix}return${a}
│${a}❏ ${prefix}readall${a}
│${a}❏ ${prefix}join${a}
│${a}❏ ${prefix}antidelete aktif/mati${a}
│${a}❏ ${prefix}antidelete ctaktif/ctmati${a}
╰───────────────────────────┈ ⳹

╭─❒*「 *ABOUT* 」*
│${a}❏ ${prefix}runtime${a}
│${a}❏ ${prefix}creator${a}
│${a}❏ ${prefix}donasi${a}
│${a}❏ ${prefix}iklan${a}
│${a}❏ ${prefix}ping${a}
│${a}❏ ${prefix}info${a}
│${a}❏ cekprefix${a}
╰───────────────┈ ⳹

「 *${botName}* 」`
					fakestatus(bosnya)
					break
                case 'join':
                if (!isOwner) return reply(nad.ownerb())
                if (args.length < 1) return reply(`Kirim perintah *${prefix}join* link grup`)
                if (!isUrl(args[0]) && !args[0].includes('chat.whatsapp.com')) return reply('Link tidak valid')
					setTimeout( () => {
					alfa.query({json:["action", "invite", `${args[0].replace('https://chat.whatsapp.com/','')}`]})
					suksez = `Done!`
					alfa.sendMessage(from, suksez, text,{quoted : Lan, contextInfo: { forwardingScore: 100, isForwarded: true}})
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					reply('Bentar Boss')
					}, 0) // 1000 = 1s,
					break					
                case 'colong': // TAKE STICKER
					if (!isOwner) return reply(nad.ownerb())
                    var namaPackss = `${autor}`
                    var authorPackss = `${peknem}`
                    stiker_wm = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await alfa.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPackss;
                    author = authorPackss;
                    exif321 = getRandom('.exif')
                    exifst = getRandom('.webp')
                    googlelink = `https://wa.me/6289523258649?text=${prefix}menu`;
                    applelink = `https://wa.me/6289523258649?text=${prefix}menu`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exif321, wm, function (err) {
                        if (err) return console.log(err);
                        exec(`webpmux -set exif ${exif321} undefined.webp -o ${exifst}`, (err) => {
                            if (err) return console.log(err);
                            alfa.sendMessage(from, fs.readFileSync(exifst), sticker, { quoted: Lan })
                            fs.unlinkSync(exifst)
                            fs.unlinkSync(exif321)
                            fs.unlinkSync('undefined.webp')
                        })
                    });
                    break
                case 'take': // TAKE STICKER
                if (!isPrem) return reply(nad.premium(prefix))

                    var namaPackss = q.substring(0, q.indexOf('|') - 1)
                    var authorPackss = q.substring(q.lastIndexOf('|') + 2)
                    stiker_wm = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    dlstiker_wm = await alfa.downloadAndSaveMediaMessage(stiker_wm)
                    stickerpackid = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2" //not sure what this does
                    packname = namaPackss;
                    author = authorPackss;
                    exif321 = getRandom('.exif')
                    exifst = getRandom('.webp')
                    googlelink = `https://wa.me/6285559240360?text=${prefix}menu`;
                    applelink = `https://wa.me/6285559240360?text=${prefix}menu`;


                    json = { "sticker-pack-id": stickerpackid, "sticker-pack-name": packname, "sticker-pack-publisher": author, "android-app-store-link": googlelink, "ios-app-store-link": applelink }
                    len = JSON.stringify(json).length

                    f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00])
                    aaa = [0x00, 0x00, 0x16, 0x00, 0x00, 0x00]
                    if (len > 256) {
                        len = len - 256
                        aaa.unshift(0x01)
                    } else {
                        aaa.unshift(0x00)
                    }
                    fff = Buffer.from(aaa)
                    ffff = Buffer.from(JSON.stringify(json))

                    if (len < 16) {
                        len = len.toString(16)
                        len = "0" + len
                    } else {
                        len = len.toString(16)
                    }
                    ff = Buffer.from(len, "hex")

                    wm = Buffer.concat([f, ff, fff, ffff])

                    fs.writeFile(exif321, wm, function (err) {
                        if (err) return console.log(err);
                        exec(`webpmux -set exif ${exif321} undefined.webp -o ${exifst}`, (err) => {
                            if (err) return console.log(err);
                            alfa.sendMessage(from, fs.readFileSync(exifst), sticker, { quoted: Lan })
                            fs.unlinkSync(exifst)
                            fs.unlinkSync(exif321)
                            fs.unlinkSync('undefined.webp')
                        })
                    });
                    break
                case 'setexif':
					if (!isOwner) return reply(nad.ownerb())
                    const namaPack = q.substring(0, q.indexOf('|') - 1)
                    const authorPack = q.substring(q.lastIndexOf('|') + 2)
                    fs.unlinkSync('./sticker/data.exif')
                    sleep(2000)
                    addMetadata(namaPack, authorPack)
                    fakestatus(`Success ubah wm sticker`)
                    break
                        case 'y':
                        if (!isOwner) return reply(nad.ownerb())
                            var value = args.join(" ")
                            var options = {
                                text: value,
                                contextInfo: {
                                    participant: '0@s.whatsapp.net',
                                    remoteJid: 'status@broadcast',
                                    isForwarded: true,
                                    forwardingScore: 300,
                                    quotedMessage: {
                                        documentMessage: {
                                            fileName: cr,
                                            jpegThumbnail: fs.readFileSync('./src/image/thumbnail.jpeg'),
                                            mimetype: 'application/pdf',
                                            pageCount: 200
                                        }
                                    }
                                }
                            }
                            alfa.sendMessage(from, options, text)
                            break			
                case 'setthumb':
                if (!isOwner) return reply(nad.ownerb())
                    if (!isQuotedImage) return reply('Reply imagenya blokk!')
                    const messimagethumb = JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
                    const downiamgethumb = await alfa.downloadMediaMessage(messimagethumb)
                    fs.unlinkSync(`./src/image/thumbnail.jpeg`)
                    await sleep(2000)
                    fs.writeFileSync(`./src/image/thumbnail.jpeg`, downiamgethumb)
                    reply('Succes')
                    break
				case 'setppbot':
				alfa.updatePresence(from, Presence.composing)
				if (!isQuotedImage) return reply(`Kirim gambar dengan caption ${prefix}setbotpp atau tag gambar yang sudah dikirim`)
					if (!isOwner) return reply(nad.ownerb())
					enmedia = JSON.parse(JSON.stringify(Lan).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await alfa.downloadAndSaveMediaMessage(enmedia)
					await alfa.updateProfilePicture(botNumber, media)
					reply('Makasih profil barunya😗')
					break
                 case 'readall':
					if (!isOwner) return reply(nad.ownerb())
					var chats = await alfa.chats.all()
                    chats.map( async ({ jid }) => {
                          await alfa.chatRead(jid)
                    })
					rdl = `${a}Berhasil membaca ${chats.length} Chat !${a}`
					await alfa.sendMessage(from, rdl, MessageType.text, {quoted: Lan})
					console.log(chats.length)
					break
				case 'addprem':
					if (!isOwner) return reply(nad.ownerb())
					adprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					premium.push(adprem)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENAMBAHKAN USER PREMIUM`)
					break

				case 'dellprem':
					if (!isOwner) return reply(nad.ownerb())
					delprem = `${args[0].replace('@', '')}@s.whatsapp.net`
					delp = ban.indexOf(delprem)
					premium.splice(delp, 1)
					fs.writeFileSync('./database/premium.json', JSON.stringify(premium))
					fakestatus(`BERHASIL MENGHAPUS USER PREMIUM`)
					break
					
                case 'premiumlist':
				alfa.updatePresence(from, Presence.composing) 
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
				pemlist = '╭──「 *USER PREMIUM* 」\n'
				for (let premm of premium) {
					pemlist += `> @${premm.split('@')[0]}\n`
					}
					pemlist += `Total : ${premium.length}`
				alfa.sendMessage(from, pemlist.trim(), extendedText, {quoted: Lan, contextInfo: {"mentionedJid": premium}})
				break
				
				case 'ban':
					if (!isOwner) return reply(nad.ownerb())
					bnnd = `${args[0].replace('@', '')}@s.whatsapp.net`
					ban.push(bnnd)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${bnnd} telah dibanned!`)
					break

				case 'unban':
					if (!isOwner) return reply(nad.ownerb())
					ya = `${args[0].replace('@', '')}@s.whatsapp.net`
					unb = ban.indexOf(ya)
					ban.splice(unb, 1)
					fs.writeFileSync('./database/banned.json', JSON.stringify(ban))
					fakestatus(`Nomor ${ya} telah di unban!`)
					break
                   case 'addbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`)
                    const bw = body.slice(12)
                    bad.push(bw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menambahkan BAD WORD!')
                    break
                case 'delbadword':
					if (!isOwner) return reply(nad.ownerb())
                    if (args.length < 1) return reply( `Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`)
                    let dbw = body.slice(12)
                    bad.splice(dbw)
                    fs.writeFileSync('./database/bad.json', JSON.stringify(bad))
                    reply('Success Menghapus BAD WORD!')
                    break 
                case 'listbadword':
                case 'badwordlist':
					if (isBanned) return reply(nad.baned())
					if (!isRegistered) return reply(nad.noregis())
                    let lbw = `Ini adalah list BAD WORD\nTotal : ${bad.length}\n`
                    for (let i of bad) {
                        lbw += `➢ ${i.replace(bad)}\n`
                    }
                    await reply(lbw)
                    break
				case 'bc':
					alfa.updatePresence(from, Presence.composing)
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('.......')
					anu = await alfa.chats.all()
					if (isMedia && !Lan.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(Lan).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : Lan
						buff = await alfa.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							alfa.sendMessage(_.jid, buff, image, { caption: `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}` })
						}
						reply('')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `*「 ${botName} BROADCAST 」*\n\n${body.slice(4)}`)
						}
						reply('*「 SUKSES BOSKU 」*')
					}
					break

				case 'setreply':
					if (!isOwner) return reply(nad.ownerb())
					alfa.updatePresence(from, Presence.composing)
					if (args.length < 1) return
					cr = body.slice(10)
					fakestatus(`reply berhasil di ubah menjadi : ${cr}`)
					await limitAdd(sender)
					break					
					
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(nad.ownerb())
					prefix = args[0]
					fakestatus(`*「 SUKSES 」* Prefix jadi ➸ : ${prefix}`)
					break

				case 'setbio':
					if (!isOwner) return reply(nad.ownerb())
					iyek = body.slice(8)
					alfa.setStatus(`${iyek}`)
					fakestatus(`Status BOT berhasil diperbarui menjadi :\n*[ ${iyek} ]*`)
					break
					
				case 'clearall':
					if (!isOwner) return reply(nad.ownerb())
					anu = await alfa.chats.all()
					alfa.setMaxListeners(25)
					for (let _ of anu) {
						alfa.deleteChat(_.jid)
					}
					fakestatus(nad.clears())
					break

				case 'event':
					if (isBanned) return reply(nad.baned())
					if (!isGroup) return reply(nad.groupo())
					if (!isOwner) return reply(nad.ownerb())
					if (args.length < 1) return reply('Ekhemm >_<')
					if (Number(args[0]) === 1) {
						if (isEventon) return reply('*FITUR EVENT SUDAH AKTIF BOS*')
						event.push(from)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MENGAKTIFKAN EVENT DI GROUP*')
					} else if (Number(args[0]) === 0) {
						event.splice(from, 1)
						fs.writeFileSync('./database/event.json', JSON.stringify(event))
						reply('*「 SUKSES 」MEMATIKAN EVENT DI GROUP*')
					} else {
						reply('pilih 1/0')
					}
					break

				case 'term':
					if (!isOwner) return reply(nad.ownerB())
					const cmd = body.slice(6)
					var itsme = `0@s.whatsapp.net`
					var split = `EXECUTOR`
					const term = {
						contextInfo: {
							participant: itsme,
							quotedMessage: {
								extendedTextMessage: {
									text: split,
								}
							}
						}
					}
					exec(cmd, (err, stdout) => {
						if (err) return alfa.sendMessage(from, `root@Ramlan:~ ${err}`, text, { quoted: Lan })
						if (stdout) {
							alfa.sendMessage(from, stdout, text, term)
						}
					})
					break

                case 'return':
                    return fakestatus(JSON.stringify(eval(args.join(''))))
                    break
				default:
					if (budy == '@verify') {
						if (isBanned) return reply(nad.baned())
						if (isRegistered) return reply(nad.rediregis())
						const serialUser = createSerial(20)
						veri = sender
						if (isGroup) {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await alfa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
${a}➸ Nama : ${pushname}${a}
${a}➸ Nomor : wa.me/${sender.split("@")[0]}${a}
${a}➸ Waktu Verify : ${time}${a}
${a}➸ SN : ${serialUser}${a}
${a}➸ User Verified : ${_registered.length}${a}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							alfa.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
							addLevelingId(sender)
							console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'), 'in', color(sender || groupName))
						} else {
							addRegisteredUser(sender, pushname, time, serialUser)
							try {
								ppadd = await alfa.getProfilePicture(`${sender.split('@')[0]}@s.whatsapp.net`)
							} catch {
								ppadd = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
							}
							captnya = `╭──「 *VERIFIKASI BERHASIL* 」
${a}➸ Nama : ${pushname}${a}
${a}➸ Nomor : wa.me/${sender.split("@")[0]}${a}
${a}➸ Waktu Verify : ${time}${a}
${a}➸ SN : ${serialUser}${a}
${a}➸ User Verified : ${_registered.length}${a}
╰─────「 *${botName}* 」`
							let peripi = await getBuffer(ppadd)
							alfa.sendMessage(from, peripi, image, {
								caption: captnya, quoted: {
									key: {
										fromMe: false,
										participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {})
									},
									message: {
										conversation: cr
									}
								}
							})
						}
						addLevelingId(sender)
						console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(pushname, 'cyan'))
					}
			}
			if (budy == 'cekprefix') {
				fakestatus(`*${botName} MENGGUNAKAN PREFIX :「 ${prefix} 」*`)
			}
			if (budy == 'p') {
				reply(`Ya, Ada Yang Bisa Saya Bantu? Kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'P') {
				reply(`Ya, Ada Yang Bisa Saya Bantu? Kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'bot') {
				reply(`Ya, Emang Gue BOT🗿\nApa? Gak Seneng?\nBewan Pantek😡`)
			}
			if (budy == 'Bot') {
				reply(`Ya, Emang Gue BOT🗿\nApa? Gak Seneng?\nBewan Pantek😡`)
			}
			if (budy == 'assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Assalamualaikum') {
				reply(`Waalaikumsalam, Ada Yang Bisa Saya Bantu? kalo Bingung Ketik ${prefix}menu Ya Kak`)
			}
			if (budy == 'Terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'terimakasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'makasih') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'thanks') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'Tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
			}
			if (budy == 'tq') {
				reply(`Sama sama, Semoga Harimu Menyenangkan :)`)
				}
				
			if (isGroup && !isCmd && budy != undefined) {
				//console.log(budy)
				//		reply(alfa.cmdnf(prefix, command))
			} else {
				//console.log(color('[404]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
			}
		} catch (e) {
			//console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()