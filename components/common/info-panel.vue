<template>
	<div class="infopanel">
		<div class="infopanel__container">
			<div class="infopanel__main-wrapper">
				<div class="infopanel__title">{{ title }}</div>
				<div class="infopanel__menu">
					
					<div v-if="infoblocks && infoblocks.length" class="infopanel-additional">
						<div v-for="(infoblock, index) in infoblocks" :key="index" class="infopanel-additional__bloсk">
							<span class="infopanel-additional__label">{{ infoblock.label }}</span>
							<span class="infopanel-additional__text">{{ infoblock.value }}</span>
						</div>
					</div>

					<div v-if="links && links.length" class="infopanel-links">
						<div class="infopanel-links__wrapper">
							<ui-link 
									v-for="(link, index) in links"
									:key="index"
									:name="link.name"
									:href="link.href"
									:disabled="link.disabled"
									@click="link.event ? link.event : null "/>
						</div>
					</div>

					<div v-if="buttons && buttons.length" class="infopanel-buttons">
						<div class="infopanel-buttons__wrapper">
							<div v-for="(button, index) in buttons" :key="index" class="infopanel-buttons__button">
								<ui-button 
									:name="button.name" 
									:disabled="button.disabled"
									:secondary="button.secondary" 
									@click="button.event" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="help" class="infopanel__help">
				<a class="infopanel__help-link" target="_blank" :href="help">
                    <img class="infopanel__help-img" src="sximo/images/instruction.svg" alt="">
                    <span class="infopanel__help-text">Инструкция</span>
                </a>
			</div>
		</div>
	</div>
</template>

<script>
import { onWindowResize } from '../mixins/window-size'

export default {
	mixins: [ onWindowResize ],

	props: {
		title: {
			type: String,
			default: 'Заголовок',
		},
		infoblocks: {
			type: Array,
			default: null,
		},
		links: {
			type: Array,
			default: null,
		},
		buttons: {
			type: Array,
			default: null,
		},
		help: {
			type: String,
			default: null,
		}
	}
}
</script>

<style lang="scss">
@import '../../../sass/settings/_mixins.scss';
@import '../../../sass/modules/forms.scss';

.infopanel {
	padding: 5px 2.4%;
	margin-bottom: 10px;
	background-color: #ffffff;
	font-family: 'Roboto';
	font-weight: bold;

	&__main-wrapper {
		padding-top: 3px;
		width: 100%;
		padding-right: 10px;
		display: flex;
	}

	&-links {
		display: flex;
		max-width: 300px;
		flex-wrap: wrap;
		align-items: center;
		overflow-x: auto;
		overflow-x: overlay;

		@include scroll();
	}

	&__container {
		display: flex;
		flex-direction: row;
		align-items: start;
		height: 54px;
	}

	&__title {
		height: 100%;
		margin: 13px 0 13px;
		padding-right: 10px;
		font-size: 24px;
		font-weight: bold;
		color: #212121;
		line-height: 28px;
		white-space: nowrap;
	}

	&__menu {
		display: flex;
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	&__help {
		height: 100%;
		margin: 16px 1px 0 auto;
		white-space: nowrap;
		font-weight: normal;

		&-link {
			color: #e58325;
		}

		&-img {
			width: 20px;
			height: auto;
			max-width: 100%;
			vertical-align: middle;
			color: #e58325;
		}

		&-text {
			color: #e58325;
			font-size: 14px;
			border-bottom: 1px solid;
		}
	}

	&__mobile {

		&-menu {
			position: relative;
			height: 21px;

			.header-control-menu {
				position: absolute;
				width: max-content;
				top: 25px;
				left: 0;
				border: none !important;
				box-shadow: 2.5px 0px 20px 5px rgba(0, 0, 0, 0.3);
				padding: 7.5px 15px !important;
				display: flex;
				flex-direction: column;

				&_visible {
					visibility: visible;
				}

				&.smaller .header-control {
					padding: 7.5px 0;
					margin: 0;
				}
			}
		}

		&-button {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 20px;
			height: 20px;
			font-size: 16px;
			color: #fff;
			background-color: #d67b28;
			border-radius: 50%;
		}
	}
}

.header-control-menu {
	top: auto;
	visibility: hidden;
}

.infopanel-additional {
	padding: 6px 10px 0;
	border-left: 1px solid #8ac0c0;
	font-weight: normal;
	width: auto;
    display: flex;
    flex-wrap: nowrap;
	max-width: 200px;
	overflow-x: auto;
	overflow-x: overlay;

	@include scroll();

	&__bloсk {
		position: relative;
		display: inline-block;
		padding: 0 5px;
	}

	&__label {
		display: block;
		line-height: 14px;
		font-size: 12px;
		color: #696969;
		white-space: nowrap;
	}

	&__text {
		display: block;
		text-align: center;
		margin-top: 4px;
		line-height: 21px;
		font-size: 16px;
		color: #212121;
		white-space: nowrap;
	}

}

.infopanel-links {
	padding-left: 10px;
	padding-right: 10px;
	border-left: 1px solid #8ac0c0;
	font-weight: normal;
	// min-width: 250px;
	min-height: 50px;

	&__link {
		display: inline-block;
	}

	&__wrapper {
		display: flex;
		flex-wrap: nowrap;

		& > div:last-child .ui-link__link {
			margin-right: 0;
		}
	}
}

.infopanel-buttons {
	font-weight: normal;
	padding-top: 12px;
	padding-left: 10px;
	padding-right: 10px;
	min-height: 50px;
	border-left: 1px solid #8ac0c0;

	&__button {
		display: inline-block;
		margin-left: 10px;
		margin-right: 10px;
		margin-bottom: 10px;
	}
}

@media (max-width: 1200px) {
	.infopanel {

		&__main-wrapper {
			width: 100%;
			padding-right: 0;
			flex-wrap: wrap;
		}

		&__container {
			height: auto;
			flex-wrap: wrap;
		}

		&__title {
			width: 100%;
			padding-right: 0;
			margin-top: 0;
			padding-top: 5px;
			text-align: center;
		}

		&__menu {
			flex-wrap: wrap;
			width: 100%;
		}

		&-additional {
			flex-wrap: wrap;
			padding-top: 0;

			&__block {
				padding-bottom: 5px;
				&:last-child {
					padding-right: 0;
				}
			}
		}

		&-additional,
		&-buttons,
		&-links {
			width: 100%;
			border-left: none;
			justify-content: center;
			margin-bottom: 10px;
		}

		&-buttons {
			margin-bottom: 0;
		}

		&-links {
			min-height: auto;
		}

		&__help {
			margin: 0 auto 10px;
		}
	}

	.infopanel-additional {
		max-width: 100%;
	}

	.infopanel-additional__bloсk:last-child {
		margin-right: 0;
		padding-right: 0;
	}

	.infopanel-links {
		max-width: 100%;

		&__wrapper {
			flex-wrap: wrap;
			justify-content: center;

			& > div:last-child .ui-link__link {
					margin-right: 0;
			}
		}
	}
	.infopanel-buttons {
		padding-top: 6px;

		&__wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
		}
	}
}
</style>