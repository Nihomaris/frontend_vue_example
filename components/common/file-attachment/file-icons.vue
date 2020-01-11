<template>
	<div v-if="files.length">
	    <div class="attachment-files">
	        <div class="attachment-files__wrapper col-lg-12">
	            <div v-for="(file, index) in files"
	                :key="index"
	                class="attachment-files__file"> 

	                <div class="attachment-files__content">
	                	<template v-if="file.link">
		                	<div class="attachment-files__file-icon">
		                	    <img :src="fileIcon(file.data.name)" style="width: 100%;" alt="">
		                	</div>
		                	<span class="attachment-files__filename">
		                	    {{ attachFilename(file.data.name) }}
		                	</span>
						</template>

	                	<div v-else class="attachment-files__preloader">
	                		<img src="/img/preloader.svg" alt="" class="attachment-files__preloader-img">
	                	</div>
	                    
	                </div>
	                <i class="material-icons attachment-files__remove" @click="removeFile(index)">close</i>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	export default {
		props: {
			'files': {
				type: Array,
				default: () => [],
			},
		},
		methods: {
			// удаление файла из массива
			removeFile(index) {
			    this.files.splice(index, 1);
			},

			// обрезка имени
			attachFilename(name) {
			    if (name.length <= 10) {
			        return name;
			    } else {
			        let extension = name.split('.').pop();
			        return `${name.substring(0, 5)}...${extension}`;
			    }
			},

			// подставляем в верстку иконку в зависимости от расширения файла
			fileIcon(fileName) {
			    let fileExtension = fileName.split('.').pop();
			    return fileExtension === 'jpg' ?
			        '/img/tickets-images/attach-file-jpg.png' :
			        '/img/tickets-images/attach-file-png.png';
			},
		}
	}
</script>
<style lang="scss">
		.attachment-files {
	    &__wrapper {
	        width: 100%;
	        display: flex;
	        flex-wrap: wrap;
	        margin-left: 0;
	        padding: 0;
	        padding-top: 5px;

	    }

	    @media (max-width: 1200px) {
	        padding-top: 0;
	    }

	    &__file {
	        display: flex;
	        justify-content: space-between;
	        align-items: center;
	        border: 1px solid #B2B2B2;
	        border-radius: 5px;
	        height: 50px;
	        padding: 7px 10px;
	        margin-right: 5px;
	        margin-bottom: 5px;
	        width: calc(25% - 5px);
	        min-width: 150px;

	        &:nth-child(4n) {
	            width: 25%;
	            margin: 0 0 5px 0;
	        }

	        @media (max-width: 1500px) {
	            &, &:nth-child(4n) {
	                width: calc(33.3333% - 5px);
	                margin-right: 5px;
	                margin-bottom: 5px;
	            }
	        }

	        @media (max-width: 568px) {
	            &, &:nth-child(4n) {
	                width: calc(50% - 5px);
	                margin-right: 5px;
	                margin-bottom: 5px;
	            }
	        }

	        @media (max-width: 400px) {
	            &, &:nth-child(4n) {
	                width: calc(100%);
	                margin-bottom: 5px;
	                margin-right: 0;
	            }
	        }
	    }

	    &__content {
	        display: flex;
	        align-items: center;
	    }

	    &__file-icon {
	        display: flex;
	        width: 35px;
	        height: 35px;
	        margin-right: 7px;
	    }

	    &__remove {
	        font-size: 16px;
	        cursor: pointer;
	        color: #696969;
	    }

	    &__remove:hover {
			color: #e58325;
	    }	    

	    &__filename {
	        text-align: left;
	    }
	}
</style>
