<template>
  <canvas ref="canvas" class="canvas"></canvas>
  <LoginForm v-if="isLogin" @type="isLogin = !isLogin" />
  <!-- <register v-else @type="isLogin = !isLogin" /> -->
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import {
  TextureLoader,
  Clock,
  ShaderMaterial,
  Vector3,
  WebGLRenderer,
} from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { FullScreenQuad } from "three/examples/jsm/postprocessing/Pass";
import shaderVertex1 from "@/utils/shader/uu";
import LoginForm from "./form";
// import register from "@/views/main/login/register";

const canvas = ref();
const isLogin = ref(true);
let renderer, renderId;
let scene;
let camera, geom, textureLoader, uniform, clock, composer;
let width,
  height,
  quad = new FullScreenQuad();
const init = () => {
  const container = canvas.value; // document.getElementById('container')
  clock = new Clock();
  textureLoader = new TextureLoader();
  renderer = new WebGLRenderer({
    antialias: true,
    alpha: true,
    canvas: container,
  });
  width = window.innerWidth;
  height = window.innerHeight;
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  // renderer.outputEncoding = sRGBEncoding
  // scene = new Scene()
  // camera = new PerspectiveCamera(75, width / height, 1, 10000)
  // const aspect = window.innerWidth / window.innerHeight;
  // const frustumSize = 1000;
  // camera = new OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 1, 1000 );
  // 相机位置
  // camera.position.set(0, 10, 500)
  window.onresize = function () {
    const twidth = window.innerWidth;
    const theight = window.innerHeight;
    //
    // camera.aspect = twidth / theight
    // camera.updateProjectionMatrix()
    renderer.setSize(twidth, theight);
    width = twidth;
    height = theight;
    uniform.iResolution.value.set(twidth, theight, 0);
    // console.log(geom);
  };
  const url = "/img/ccs.jpg";
  uniform = {
    iResolution: {
      value: new Vector3(window.innerWidth, window.innerHeight, 0),
    },
    iMouse: { value: new Vector3() },
    iTime: { value: 5 },
    map: { value: textureLoader.load(url) },
  };
  // textureLoader.load(url,
  //     (texture) => {
  //         console.log(texture)
  //         uniform.map.value = texture
  //     },
  //     undefined,
  //     (err) => {
  //         console.log(err);
  //     });
  const material = new ShaderMaterial({
    uniforms: uniform,
    vertexShader: ` void main() {
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
					}`,
    fragmentShader: shaderVertex1,
  });
  quad.material = material;
  // const renderPass = new RenderPass(scene, camera)
  // renderPass.clearColor = new Color(0, 0, 0)
  // renderPass.clearAlpha = 0
  //
  // //
  //
  // const fxaaPass = new ShaderPass(FXAAShader)
  // const pixelRatio = renderer.getPixelRatio()
  // fxaaPass.material.uniforms.resolution.value.x = 1 / (container.offsetWidth * pixelRatio)
  // fxaaPass.material.uniforms.resolution.value.y = 1 / (container.offsetHeight * pixelRatio)
  //
  // composer = new EffectComposer(renderer)
  // composer.addPass(renderPass)
  // composer.addPass(fxaaPass)
  renderer.toneMappingExposure = Math.pow(2, 4.0);
  // composer.toneMappingExposure = Math.pow(2, 4.0)

  animate();
};
const animate = () => {
  const elapsedTime = clock.getElapsedTime();
  uniform.iTime.value = elapsedTime;
  renderId = requestAnimationFrame(animate);
  quad.render(renderer);
  // renderer.render(scene, camera)
  // composer.render()
};
onBeforeUnmount(() => {
  quad.dispose();
  quad.material.dispose();
  uniform.map.value.dispose();
  renderer.dispose();
  cancelAnimationFrame(renderId);
});
onMounted(() => {
  init();
});
</script>

<style lang="scss" scoped>
.canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
