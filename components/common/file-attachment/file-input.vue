<template>
	<div class="form-actions__attach-file">
		<input type="file" multiple ref="file" @change="attachFile($event)" class="attachment__input hidden-input-file">
		<a class="attachment__button" @click="$refs.file.click()"><i class="material-icons attachment__icon">attach_file</i>
		<span class="attachment__text">Прикрепить файл</span>
		</a>
	</div>
</template>
<script>
	import showNotify from '../../../modules/notification'

	export default {
		props: {
			'files': {
				type: Array,
				default: () => [],
			},
			'jwt': { 
				type: String,
				default: '',
				required: true
			},
		},
		
		methods: {
			// после подтверждения прикрепленных файлов, проверяем каждую картинку на: размер, валидное расширение
			// если картинок в массиве больше 10 то следующие уже не добавятся
			attachFile(event) {
			    let files = event.target.files;
			    for (let i = 0; i < files.length; i++) {
			        if (this.isValidExtension(files[`${i}`].name) && this.files.length < 10 && files[`${i}`].size <= 10000000) {
			            this.files.push({ data: files[`${i}`], link: null });
			        }
			    }
			    this.uploadFile()
			},

			// проверка расширения
			isValidExtension(fileName) {
			    let fileIcon = fileName.split('.').pop().toLowerCase(); // получаем расширение файла
			    const validExtensions = ['jpg', 'png', 'jpeg'];
			    return validExtensions.indexOf(fileIcon) !== -1;
			},
			
			/* Загружаем файл на микросервис */
			uploadFile() {
				let vm = this;
				
				let file = vm.files.find(item => {
					if(item.link === null) {
						return item;
					}
				})

				if(file) {
					let form = new FormData();

					form.append('file', file.data)
					form.append('token', vm.jwt)

					// axios.post('https://img.invite.taxi/v1/upload', form).then(res => {
					axios.post('https://img.invite.taxi/v1/upload', form).then(res => {
						if(res.status === 200 && !res.data.errors.length) {
							file.link = `https://img.invite.taxi/v1${res.data.result.link}`
							vm.uploadFile();
						}
					}).catch(err => {
						showNotify('Ошибка', 'при попытке загрузки изображения', 'error');
						console.warn('Ошибка при попытке загрузки изображения', err)
					})

				} else {
				
				}
			},
		},
	}
</script>
<style lang="scss">
	@import '../../../../sass/settings/_mixins.scss';
	@import '../../../../sass/modules/notification.scss';

	// Кнопка прикрепить файл
	.attachment__button {
	    display: flex;
	    align-items: center;
	    padding: 7px 0;
	    color: #696969;
	    max-width: 145px;
	}

	.attachment__text {
	    font-size: 12px;
	    width: 99px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: inline-block;
	    line-height: 22px;
	    vertical-align: middle;

	    &:hover {
	        color: #e58325;
	    }
	}

	.attachment__icon {
	    margin-right: 5px;
	    transform: rotate(45deg);
	}

	.attachment__text {
	    font-size: 12px;
	    width: 99px;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: inline-block;
	    line-height: 22px;
	    vertical-align: middle;
	}
</style>
