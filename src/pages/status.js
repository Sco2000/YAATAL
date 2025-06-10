import { getCurrentUser } from "../utils/auth";
import { fetchUsers, fetchStatuses, fetchContacts, fetchUserById } from "../api/api";
import { createElement } from "../components";

export async function getContactStatus () {
    const currentUser = getCurrentUser();
    const users = await fetchUsers();
    if(!currentUser) return

    const status = await fetchStatuses();
    const userContact = currentUser.contacts
    const userstatus = status.filter(stats => {
        return userContact.includes(stats.userId)}
    );
    return userstatus;
}

export async function separateStatus() {
    const container = document.getElementById('status-container');
    if (!container) return;

    const currentUser = getCurrentUser();
    if(!currentUser) return

    const status = await getContactStatus();

    function groupStatusByUser(statusArray) {
        const grouped = {};
        statusArray.forEach(stats => {
            const userId = stats.userId;
            if (!grouped[userId]) {
                grouped[userId] = [];
            }
            grouped[userId].push(stats);
        });
        return grouped;
    }
    
    const statusSorted = {};
    
    const recentStatus = [];
    const seenStatus = [];
    
    status.forEach(stats => {
        const userContactStatus = currentUser.contactStatus.filter(contact => contact.id === stats.userId);

        if (userContactStatus.length !== 0) {
            const allViewed = userContactStatus.every(contact => contact.isViewed === true);
            
            if (allViewed) {
                seenStatus.push(stats);
            } else {
                recentStatus.push(stats);
            }
        }
    });

    if(recentStatus.length !== 0){
        statusSorted.unseen = groupStatusByUser(recentStatus);
    }
    if(seenStatus.length !== 0){
        statusSorted.seen = groupStatusByUser(seenStatus);
    }

    if(Object.keys(statusSorted).length !== 0){
    for (const key in statusSorted) {
        
        const nature = createElement("div", {class: []}, createElement("div", {
            class: ["text-teal-400", "text-base","uppercase", "tracking-wider"]
        }, createElement("div", {class: ["p-6"]}, key)))
        for (const stats in statusSorted[key]) {
            const user = await fetchUserById(stats);
            console.log(statusSorted[key]);
            let lastStatus = null;
            if (statusSorted[key][stats].length > 0) {
                lastStatus = statusSorted[key][stats].reduce((latest, current) => {

                    return new Date(current.timestamp) > new Date (latest.timestamp) ? current : latest;
                })
            }
            const latestStatusTime = lastStatus ? new Date(lastStatus.timestamp).getTime() : null;
            console.log(
                (lastStatus.timestamp));
            

            console.log(latestStatusTime);
            console.log(user["avatar"]);
            
            const contain = createElement("div", {},
                            [
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                createElement("hr", {class: ["w-[82%]", "ml-auto", "border-gray-800"]}),
                                // Yande Ngom status
                                createElement("div", {
                                class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
                                }, 
                                [
                                    createElement("div", {
                                        class: ["relative"]
                                    }, 
                                    [
                                        createElement("img", {
                                        class: ["w-14", "h-14", "rounded-full", "object-cover"],
                                        src: lastStatus.content,
                                        alt: "Yande Ngom"
                                        }),
                                        createElement("div", {
                                        class: ["absolute", "inset-0", "rounded-full", "border-2", key === "unseen" ? "border-teal-400" : "border-gray-300"]
                                        })
                                    ]),
                                    createElement("div", {
                                        class: ["flex", "flex-col"]
                                    }, 
                                    [
                                        createElement("div", {
                                        class: ["text-white", "font-medium"]
                                        }, user["name"]),
                                        createElement("div", {
                                        class: ["text-gray-400", "text-sm"]
                                        }, 
                                        formatDate(lastStatus.timestamp))
                                    ])
                                ]),
                                
                            ])
                        nature.appendChild(contain)                           
        }
        
        container.appendChild(nature)                
    }}
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const actualDate = new Date();
    const diffMinutes = Math.floor((actualDate - date) / 60000); // Différence en minutes
    const diffHours = Math.floor(diffMinutes / 60); // Différence en heures
    if (diffMinutes < 60) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
    if (diffHours < 24) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
}