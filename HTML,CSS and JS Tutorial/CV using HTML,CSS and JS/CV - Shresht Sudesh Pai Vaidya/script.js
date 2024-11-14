// JavaScript can be added here for interactive features, if needed
function toggleSection(sectionId){
    // const section=document.getElementById(sectionId);
    // const content=section.querySelector('ul, p, h3');
    // if(content.style.display === 'none'){
    //     content.style.display = 'block';
    // } else {
    //     content.style.display = 'none';
    // }
    const content = document.querySelector('#${sectionId}.content');
    content.style.display = content.style.display === 'none' ? 'block' : 'none';
}