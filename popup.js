
document.addEventListener('DOMContentLoaded', async (items) => {

    function requestShowNotification(content) {
        chrome.runtime.sendMessage({ type: "requestNotification", content });
    }
    

    chrome.runtime.sendMessage({ type: "requestSummaryData" }, ({cacheElements, insights}) => {
        console.log('requestSummaryData response', cacheElements, insights);
        const container = document.getElementById('menu');
        container.innerHTML = ''; // Clear existing itemss

        const insightsElement = document.querySelector('#insights');
        insightsElement.onClick = () => {
            // go to insights page
            chrome.tabs.create({ url: 'https://notify-bigfoot-production-9b0711635f48.herokuapp.com/' });
        };
        insightsElement.innerText = `You have ${insights.count} insight`;
        insightsElement.style.backgroundColor = insights.count > 0 ? '#00B3DC' : '#E5E5E5';
        insightsElement.style.color = insights.count > 0 ? '#ffffff' : '#000000';
        insightsElement.style.color = insights.pointer = 'cursor';

        const ohNoElement = document.querySelector('.ohno');
        if (cacheElements.length === 0) {
            ohNoElement.classList.remove('hidden');
        } else {
            ohNoElement.classList.add('hidden');
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');
            menuItem.textContent = `Send Bigfoot your "${cacheElements[0].summary}" note`;
            menuItem.addEventListener('click', () => {
                requestShowNotification(cacheElements[0].summary);
                
                setTimeout(() => {
                    window.close();
                }, 1000);
            });
            container.appendChild(menuItem);
        }

        
    });

    chrome.runtime.sendMessage({ type: "clearBadge" });

});