import { getCurrentUser } from "../utils/auth";
import { createElement } from "../components";
import { fetchUserById } from "../api/api";

let currentStatusIndex = 0;
let currentUserStatuses = [];
let statusTimer = null;

export function showStatus(userId, statuses) {
    currentUserStatuses = statuses;
    currentStatusIndex = 0;
    
    // Rendre le composant visible
    // statusView.style.display = 'block';
    
    // Afficher le premier statut
    displayCurrentStatus(userId);
    
    // Démarrer le timer
    // startStatusTimer();
}

async function displayCurrentStatus(user) {
    if (!currentUserStatuses || currentUserStatuses.length === 0) return;
    
    const status = currentUserStatuses[currentStatusIndex];
    const statusView = document.getElementById('status-view');

    
    if (!statusView) return;
    const userstatus = await fetchUserById(user);
    statusView.removeAttribute("class", "hidden"); 
    
    // Mettre à jour la barre de progression
    // updateProgressBar();
    
    // Afficher le contenu du statut
    if (status.type === 'image') {
        console.log("dsdf");
        const statusContent = createElement("div", {class: ["h-full", "flex", "flex-col"]}, 
            [
                    createElement("div", {class: ["flex", "items-center", "justify-between", "p-4", "bg-gray-900"]
                    }, [
                        createElement("div", {class: ["flex", "items-center", "gap-4"]
                        }, [
                            createElement("i", {class: ["fa-solid", "fa-arrow-left", "text-white", "text-xl", "cursor-pointer"]
                            }),
                            createElement("div", {class: ["flex", "items-center", "gap-3"]
                            }, [
                                createElement("img", {class: ["w-10", "h-10", "rounded-full", "object-cover"],src: userstatus.avatar ,alt: "Profile Picture"
                                }),
                                createElement("div", {}, [
                                    createElement("div", {class: ["text-white", "font-medium"]
                                    }, userstatus.name),
                                    createElement("div", {class: ["text-gray-400", "text-sm"]
                                    }, formatDate(status.timestamp))
                                ])
                            ])
                        ]),
                        createElement("div", {class: ["flex", "items-center", "gap-4"]
                        }, [
                            // createElement("i", {class: ["fa-solid", "fa-pause", "text-white", "text-xl", "cursor-pointer"]
                            // }),
                            // createElement("i", {class: ["fa-solid", "fa-volume-xmark", "text-white", "text-xl", "cursor-pointer"]
                            // }),
                            // createElement("i", {class: ["fa-solid", "fa-ellipsis-vertical", "text-white", "text-xl", "cursor-pointer"]
                            // }),
                            createElement("i", {class: ["fa-solid", "fa-times", "text-white", "text-xl", "cursor-pointer",],
                                                onclick: () => {
                                                    statusView.setAttribute("class", "hidden"); 
                                                    statusView.innerHTML = ''; // Clear the content
                                                }
                            
                            })
                        ])
                    ]),
                    createElement("div", {class: ["w-full", "h-1", "bg-gray-700", "relative"]
                    }, [
                        createElement("div", {class: ["h-full", "bg-white", "w-full"]
                        })
                    ]),
                    createElement("div", {class: ["h-[84%]", "flex", "flex-col", "justify-center", "items-center", "p-4", "bg-black", "bg-opacity-50"]
                    }, createElement("div", {class: ["border", "h-full", "w-1/3",]}, 
                        createElement("img", {class: ["h-full", "w-full", "object-contain"], src: status.content, alt: "Status Image"
                        })
                    )),
                    createElement("div", {class: ["flex", "items-center", "justify-between", "p-4", "bg-gray-900", "gap-3"]
                    }, [
                        createElement("input", {class: ["w-full","p-2", "bg-[#2a3942]","rounded-lg", "outline-none", "text-gray-300", "placeholder:text-gray-400"],
                                                type: "text", 
                                                placeholder: "Reply to this status"
                        }),
                        createElement("i", {
                            class: ["fa-solid", "fa-paper-plane", "text-white", "text-xl", "cursor-pointer"]
                        })
                    ])
            ])
        statusView.appendChild(statusContent);
    } else {
        // // Pour les autres types de statut (texte, etc.)
        // statusView.innerHTML = `
        //     <div class="h-full flex flex-col">
        //         <div class="flex items-center justify-between p-4 bg-gray-900">
        //             <button class="text-white" onclick="closeStatus()">
        //                 <i class="fa-solid fa-arrow-left"></i>
        //             </button>
        //             <div class="text-white">${status.user.name}</div>
        //             <div class="text-gray-400 text-sm">${formatDate(status.timestamp)}</div>
        //         </div>
        //         <div class="flex-1 flex items-center justify-center">
        //             <div class="text-white text-xl">${status.content}</div>
        //         </div>
        //     </div>
        // `;
    }
    
    // Marquer le statut comme vu
    // markStatusAsViewed(status.id);
}

// function updateProgressBar() {
//     const progressContainer = document.createElement('div');
//     progressContainer.className = 'flex gap-1 px-2 py-1 bg-gray-900';
    
//     for (let i = 0; i < currentUserStatuses.length; i++) {
//         const progressBar = document.createElement('div');
//         progressBar.className = 'flex-1 h-1 rounded';
        
//         if (i < currentStatusIndex) {
//             progressBar.className += ' bg-white';
//         } else if (i === currentStatusIndex) {
//             progressBar.className += ' bg-white animate-progress';
//         } else {
//             progressBar.className += ' bg-gray-600';
//         }
        
//         progressContainer.appendChild(progressBar);
//     }
    
//     const statusView = document.getElementById('status-view');
//     const existingProgress = statusView.querySelector('.progress-container');
//     if (existingProgress) {
//         existingProgress.replaceWith(progressContainer);
//     } else {
//         statusView.insertBefore(progressContainer, statusView.firstChild);
//     }
// }

// function startStatusTimer() {
//     if (statusTimer) clearTimeout(statusTimer);
    
//     statusTimer = setTimeout(() => {
//         if (currentStatusIndex < currentUserStatuses.length - 1) {
//             currentStatusIndex++;
//             displayCurrentStatus();
//             startStatusTimer();
//         } else {
//             closeStatus();
//         }
//     }, 5000); // 5 secondes par statut
// }

// export function closeStatus() {
//     const statusView = document.getElementById('status-view');
//     if (statusView) {
//         statusView.style.display = 'none';
//     }
    
//     if (statusTimer) {
//         clearTimeout(statusTimer);
//         statusTimer = null;
//     }
    
//     currentStatusIndex = 0;
//     currentUserStatuses = [];
// }

// function markStatusAsViewed(statusId) {
//     const currentUser = getCurrentUser();
//     if (!currentUser || !currentUser.contactStatus) return;
    
//     const statusIndex = currentUser.contactStatus.findIndex(s => s.id === statusId);
//     if (statusIndex !== -1) {
//         currentUser.contactStatus[statusIndex].isViewed = true;
//         localStorage.setItem('currentUser', JSON.stringify(currentUser));
//     }
// }

// Utiliser la même fonction de formatage que dans status.js
function formatDate(dateString) {
    const date = new Date(dateString);
    const actualDate = new Date();
    const diffMinutes = Math.floor((actualDate - date) / 60000);
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
    if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
}

