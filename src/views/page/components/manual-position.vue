<template>
	<div>
		<div
			style="width: 50px; height: 30px; background-color: rgba(0, 128, 0, 0.5)"
			@contextmenu="handleContextMenu"
		>
			右击
		</div>
		<n-dropdown
			placement="bottom-start"
			trigger="manual"
			:x="x"
			:y="y"
			:options="options"
			:show="showDropdown"
			:on-clickOutSide="onClickOutSide"
			@select="handleSelect"
		/>
	</div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import { useMessage } from 'naive-ui'
defineOptions({ name: 'ManualPosition' });
// const options = defineModel<Common.ManualPosition[]>("options");
const options = defineModel<any[]>("options");
const message = useMessage()

const showDropdown = ref(false)
const x = ref(0)
const y = ref(0)

function handleSelect (key: string | number) {
	showDropdown.value = false
		message.info(String(key))
}

function handleContextMenu (e: MouseEvent) {
	e.preventDefault()
	showDropdown.value = false
	nextTick().then(() => {
		showDropdown.value = true
		x.value = e.clientX
		y.value = e.clientY
	})
}
function	onClickOutSide () {
	message.info('clickOutSide')
	showDropdown.value = false
}
</script>
<style scoped></style>
