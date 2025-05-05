async function upload() {
    const title = document.getElementById("title").value;
    const video = document.getElementById("video").files[0];
  
    if (!title || !video) {
      alert("Dodaj tytuł i wybierz film!");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("video", video);
  
    await fetch("/upload", {
      method: "POST",
      body: formData,
    });
  
    alert("Dodano film!");
    loadVideos();
  }
  
  async function loadVideos() {
    const res = await fetch("/videos");
    const videos = await res.json();
    const container = document.getElementById("videos");
    container.innerHTML = "";
    videos.forEach(video => {
      const div = document.createElement("div");
      div.className = "video-card";
      div.innerHTML = `
        <h3>${video.title}</h3>
        <video controls src="${video.path}"></video>
      `;
      container.appendChild(div);
    });
  }
  
  loadVideos();
  