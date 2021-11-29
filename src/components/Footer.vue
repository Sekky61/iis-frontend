<template>
  <!-- footer obsahující členy týmu s odkazem na jejich github stránku, odkaz na dokumentaci a stručný popis projektu -->

  <!-- wave -->
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220" class="mt-6">
    <path
      fill="#fcaf38"
      fill-opacity="1"
      d="M0,192L80,186.7C160,181,320,171,480,144C640,117,800,75,960,53.3C1120,32,1280,32,1360,32L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
    ></path>
  </svg>

  <footer class="w-full bg-theyellow flex justify-center px-16 gap-3">
    <div class="flex-1">
      <div class="text-3xl text-black mb-1">O nás</div>
      <div class="text-lg text-black">
        Tato internetová aukční síň byla vytvořena studenty VUT FIT v rámci
        předmětu IIS
      </div>
      <div class="text-lg text-black py-4">
        Tel: +420 123 456 789<br />email: aukce@iisaukce.cz <br />© 2021–2021
        Nemovitosti xjmeno s.r.o
      </div>
    </div>
    <div class="flex-1">
      <!-- sekce autoři s odkazy na github -->
      <div class="text-center m-4 text-lg">Autoři</div>
      <div class="flex justify-center">
        <div
          class="
            w-20
            h-20
            bg-red-700
            mx-4
            rounded-full
            transform
            hover:scale-125 hover:ring-4
            ring-bggradstart
            transition
            duration-300
          "
        >
          <a href="https://github.com/Sekky61" target="_blank">
            <img
              src="/resources/holt.png"
              alt="autor1"
              class="
                shadow
                rounded-full
                max-w-full
                h-auto
                align-middle
                border-none
              "
            />
          </a>
        </div>
        <div
          class="
            w-20
            h-20
            bg-red-700
            mx-4
            rounded-full
            transform
            hover:scale-125 hover:ring-4
            ring-bggradstart
            transition
            duration-300
          "
        >
          <a href="https://github.com/surViVeCZ" target="_blank">
            <img
              src="/resources/vut.jpg"
              alt="autor2"
              class="
                shadow
                rounded-full
                max-w-full
                h-auto
                align-middle
                border-none
              "
            />
          </a>
        </div>
        <div
          class="
            w-20
            h-20
            bg-red-700
            mx-4
            rounded-full
            transform
            hover:scale-125 hover:ring-4
            ring-bggradstart
            transition
            duration-300
          "
        >
          <a href="https://github.com/Wooo99" target="_blank">
            <img
              src="/resources/woo.png"
              alt="autor3"
              class="
                shadow
                rounded-full
                max-w-full
                h-auto
                align-middle
                border-none
              "
            />
          </a>
        </div>
      </div>
    </div>
    <!-- odkaz na aukci k projektu -->
    <div class="flex-1">
      <div class="text-3xl text-black mb-1 text-right">Dokumentace</div>
      <div class="text-right">Dokumentaci naleznete  <a href="/doc.html" class="underline">zde</a></div>
     
    </div>
  </footer>
</template>

<script>
export default {};
</script>

<style>
</style>