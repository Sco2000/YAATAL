import { createElement } from "../components.js";
import { FONTUP, MESSAGES_BUTTONS, RIGHT_BUTTONS } from '../consts.js';
import { handleLogout } from "../handlers/eventHandlers.js";
import {handleLogin} from "../pages/login.js";
import { handleButtonClick } from "../handlers/eventHandlers.js";

// import { FONT, RIGHT_BUTTONS, DEFAULT_USER, GROUPES } from "../consts.js";
// import { handleButtonClick, handleRightButtonClick, addContact, addGroup, sendMessage } from "../handlers/eventHandlers.js";
// import { showElement } from "./uiManager.js";
// import { closeMembersModal, toggleAddMemberForm, addMembersToGroup } from "./uiManager.js";

export const leftBox =  createElement("div", {class: ["w-[5%]", "h-full", "flex", "flex-col", "justify-between", "bg-[#202c33]"]}, 
                        [
                          createElement("div", {
                            class: ["h-[25%]", "flex", "flex-col", "gap-3", "items-center", "justify-center"],
                            vFor: {
                              each: FONTUP,
                              render: (item) => {
                                  return  createElement("button",{
                                            class: ["w-[100%]", "h-[20%]", "flex", "flex-col"],
                                            id: item.id,
                                            onclick: () => {
                                              handleButtonClick(item.id)
                                            }
                                          }, 
                                          [
                                            createElement("div", {class: item.bubbleClass}, item.bubbleContent),
                                            createElement("i",  {class: item.item, title: item.title, id: item.id}),
                                            createElement("div",{class:["text-xs", "text-slate-800"]}, item.text)
                                          ])
                              }
                            }
                          }), 
                          createElement("div", {class: ["h-[15%]", "flex", "flex-col", "justify-center", "items-center", "gap-3"]}, 
                            [ 
                              createElement("button", {title: "Paramètres", id: "settings-button", onclick: () => { handleButtonClick("settings-button") }},  createElement("i", {class: ["fa-solid fa-gear", "text-gray-500", "text-2xl"]})),
                              createElement("img", {class: ["w-10", "h-10", "cursor-pointer", "rounded-full"], id: "profile-picture", src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80", title: "Profil", onclick: () => { handleButtonClick("profile-picture") }}),
                            ]
                          )
                        ]);

export const formAddContact = createElement("div", {
    class: ["w-[80%]", "h-[60%]", "bg-[#f0efe8]", "m-20", "flex", "flex-col", "gap-4", "items-center", "rounded-2xl", "p-6"],
    id: "form-add-contact"
}, 
  [
    createElement("div", {
      class: ["text-xl", "font-semibold", "text-gray-800", "mb-2"]
    }, "Ajouter un nouveau contact"),
    
    createElement("input", {
      placeHolder: "Nom et Prénom",
      class: ["w-2/3", "h-12", "rounded-lg", "p-3", "border", "border-gray-300", "focus:border-[#e1b447]", "focus:outline-none", "bg-white"],
      id: "inputName"
    }),
    
    createElement("input", {
      placeHolder: "Téléphone",
      class: ["w-2/3", "h-12", "rounded-lg", "p-3", "border", "border-gray-300", "focus:border-[#e1b447]", "focus:outline-none", "bg-white"],
      id: "inputTel",
      type: "tel"
    }),
    
    createElement("div", {
      class: ["flex", "gap-3", "mt-4"]
    }, [
      createElement("button", {
        class: ["px-6", "py-2", "bg-[#e1b447]", "text-white", "rounded-xl", "hover:bg-[#d4a017]", "transition-colors"],
        // onclick: addContact
      }, "Ajouter"),
      createElement("button", {
        class: ["px-6", "py-2", "bg-gray-300", "text-gray-700", "rounded-xl", "hover:bg-gray-400", "transition-colors"],
        onclick: () => {
          document.getElementById("inputName").value = "";
          document.getElementById("inputTel").value = "";
        }
      }, "Annuler")
    ])
  ]);

export const formAddGroup = createElement("div", {
    class: ["w-[80%]", "h-[80%]", "bg-[#f0efe8]", "m-20", "flex", "flex-col", "gap-2", "items-center", "rounded-2xl", "p-4", "overflow-y-auto"],
    id: "form-add-group"
}, 
  [
    createElement("div", {}, createElement("div", {class:["text-xl", "mb-4"]}, "Ajouter un nouveau groupe")),
    createElement("input", {
      placeHolder: "Nom du groupe",
      class:["w-2/3", "h-[8%]", "rounded", "p-2", "mb-4"],
      id: "inputGroupName"
    }),
    createElement("div", {class: ["text-lg", "mb-2"]}, "Sélectionner les contacts :"),
    createElement("div", {class: ["text-sm", "text-gray-600", "mb-2"]}, `Vous () serez automatiquement ajouté au groupe`),
    createElement("div", {
      class: ["w-full", "flex", "flex-col", "gap-2", "max-h-[50%]", "overflow-y-auto", "mb-4"],
      id: "contacts-selection"
    }),
    createElement("div", {class: ["flex", "gap-4"]}, [
      createElement("button", {
        class: ["w-[120px]", "h-[40px]", "bg-[#e1b447]", "rounded-xl", "text-center"],
        // onclick: addGroup
      }, "Créer"),
      createElement("button", {
        class: ["w-[120px]", "h-[40px]", "bg-gray-400", "rounded-xl", "text-center"],
        // onclick: () => showElement("list-groupe")
      }, "Annuler")
    ])
  ]);

export const membersModal = createElement("div", {
  class: ["fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50", "hidden"],
  id: "members-modal",
  onclick: (e) => {
    if (e.target.id === 'members-modal') {
    //   closeMembersModal();
    }
  }
}, [
  createElement("div", {
    class: ["bg-white", "rounded-lg", "p-6", "max-w-[40%]", "w-full", "mx-4", "max-h-96", "overflow-y-auto"]
  }, [
    createElement("div", {
      class: ["flex", "justify-between", "items-center", "mb-4"]
    }, [
      createElement("h2", {
        class: ["text-xl", "font-bold"],
        id: "modal-group-name"
      }, "Membres du groupe"),
      createElement("button", {
        class: ["bg-[#e1b447]","size-8","flex", "justify-center", "items-center", "rounded-full","text-white"],
        // onclick: toggleAddMemberForm,
        title: "Ajouter un membre"
      }, createElement("i", {class: ["fa-solid", "fa-plus"]})),
      createElement("button", {
        class: ["bg-[#e1b447]","size-8","flex", "justify-center", "items-center", "rounded-full","text-white"],
        // onclick: closeMembersModal
      }, createElement("i", {class: ["fa-solid", "fa-xmark"]}))
    ]),
    
    // Formulaire d'ajout de membres (caché par défaut)
    createElement("div", {
      class: ["mb-4", "p-4", "bg-gray-50", "rounded-lg"],
      id: "add-member-form",
      vShow: false
    }, [
      createElement("div", {
        class: ["text-lg", "font-semibold", "mb-3"]
      }, "Ajouter des membres"),
      
      createElement("div", {
        class: ["mb-3"]
      }, [
        createElement("label", {
          class: ["block", "text-sm", "font-medium", "text-gray-700", "mb-2"]
        }, "Sélectionner les contacts à ajouter :"),
        createElement("div", {
          class: ["max-h-32", "overflow-y-auto", "border", "border-gray-300", "rounded", "p-2"],
          id: "available-contacts-list"
        })
      ]),
      
      createElement("div", {
        class: ["flex", "gap-2", "justify-end"]
      }, [
        createElement("button", {
          class: ["px-4", "py-2", "bg-[#e1b447]", "text-white", "rounded", "hover:bg-[#d4a017]", "transition-colors"],
        //   onclick: addMembersToGroup
        }, "Ajouter"),
        createElement("button", {
          class: ["px-4", "py-2", "bg-gray-300", "text-gray-700", "rounded", "hover:bg-gray-400", "transition-colors"],
        //   onclick: () => toggleAddMemberForm(false)
        }, "Annuler")
      ])
    ]),
    
    createElement("div", {
      class: ["space-y-3"],
      id: "members-list"
    })
  ])
]);

export const listArchive = createElement("div", {
  class: ["w-full", "h-[90%]", "flex", "flex-col", "items-center", "gap-1"],
  id: "list-archive"
});

export const listMessage = createElement("div", {
  class: ["w-full", "h-[90%]", "flex", "flex-col", "items-center"],
  id: "list-message"
},[
  createElement("div", {
    class: ["w-full", "flex", "flex-col", "items-center", "gap-1"],
    id: "header-message"
  }, [
    createElement("div", {class: ["w-full", "flex", "justify-between", "p-4"]}, 
      [
        createElement("div", { class: ["text-2xl", "text-white", "font-bold"]}, "Messages"), 
        createElement("div", { class: ["w-[15%]", "flex", "items-center", "gap-5"], id:"new-chat"}, [createElement("i", {class: ["fa-solid", "fa-plus","text-xl", "text-gray-500", "cursor-pointer"], onclick: () => { handleButtonClick("new-chat") }}), createElement("i", {class: ["fa-solid", "fa-ellipsis-vertical", "text-xl", "text-gray-500", "cursor-pointer"]})])
      ]),
    createElement("input", {
      class: ["w-[95%]", "p-2", "rounded-lg", "bg-[#202c33]", "text-gray-500", "placeholder:text-gray-500"],
      placeHolder: "Rechercher"
    },
    ),
    createElement("div", {
      class: ["flex","gap-3", "mr-auto", "p-2", "text-gray-500"],
      vFor: {
        each: MESSAGES_BUTTONS,
        render: (button) => {
          return createElement("button", {
            class: button.class,
            onclick: () => {
              console.log(button.titre);
            }
          }, button.titre);
        }
      }
    }),
    createElement("div", {class: ["w-[90%]", "flex", "justify-between"],id: "archives"}, 
      [
        createElement("div", {class: ["flex", "gap-5", "items-center", "text-white"]}, [createElement("i", {class: ["fa -solid fa-box-archive text-[#00a884]"]}), createElement("p", {}, "Archivés")]),
        createElement("div", {id: "counter-archive", class: ["text-[#00a884]", "flex", "items-center", "text-xs", "font-semibold"]}, "0"),
        
      ]),
    createElement("hr", {class: ["w-[85%]", "border-t", "ml-10", "border-gray-600"]}),
  ]),
  createElement("div", {
    class: ["w-full", "flex", "flex-col", "items-center", "gap-1"],
    id: "message-container"
  })
]);

const profil = createElement("div", {
  class: ["w-full", "h-full", "p-5","flex", "flex-col"],
  id: "profil-container"
},
[
  createElement("div", {class: ["text-2xl", "text-white", "font-bold"]}, "Profil"),
  createElement("div", {
    class: ["w-full", "h-[30%]", "flex", "justify-center", "items-center", "gap-4"]
  }, 
    createElement("img", {
      class: ["size-44", "rounded-full", "object-cover"],
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Profil"
    })
  ),
  createElement("div", {class: []}, [
    createElement("div", {class: ["text-sm","text-green-500", "flex", "flex-col", "gap-4"]},
      [
        createElement("div", {}, "Votre nom"),
        createElement("div", {class: ["w-full", "flex", "justify-between", "items-center"]}, 
        [
          createElement("div", {class: ["text-lg", "text-gray-200"]}, "Ousmane Marra"),
          createElement("div", {class: ["text-xs", "text-gray-200"]}, createElement("i", {class: ["fa-solid", "fa-pencil"]})),
        ])
      ]
    ),
    createElement("div", {class: ["py-8"]}, createElement("div", {class: ["text-sm", "text-gray-400"]}, "Il ne s'agit pas de votre nom de profil ou de votre code pin. Ce nom sera visible par vos contacts Yaatal")),
    createElement("div", {class: ["text-sm","text-green-500", "flex", "flex-col", "gap-4"]},
      [
        createElement("div", {}, "Info"),
        createElement("div", {class: ["w-full", "flex", "justify-between", "items-center"]}, 
        [
          createElement("div", {class: ["text-lg", "text-gray-200"]}, "LIFE GOES ON"),
          createElement("div", {class: ["text-xs", "text-gray-400"]}, createElement("i", {class: ["fa-solid", "fa-pencil"]})),
        ])
      ]
    )

  ])
]);

const settings = createElement("div", {
  class: ["w-full", "h-full", "p-5", "flex", "gap-1", "flex-col", "bg-gray-900"],
  id: "settings-container"
}, [
  // Header
  createElement("div", {class: "py-4"}, createElement("div", {
    class: ["text-2xl", "text-white", "font-bold", ""]
  }, "Paramètres")),
  
  // Search bar
  createElement("div", {
    class: ["w-full", ""]
  }, 
    createElement("div", {
      class: ["relative"]
    }, [
      createElement("i", {
        class: ["fa-solid", "fa-search", "absolute", "left-3", "top-1/2", "transform", "-translate-y-1/2", "text-gray-400"]
      }),
      createElement("input", {
        class: ["w-full", "bg-gray-800", "text-gray-300", "rounded-lg", "py-3", "pl-10", "pr-4", "placeholder-gray-500"],
        type: "text",
        placeholder: "Rechercher dans les paramètres"
      })
    ])
  ),

  // Profile section
  createElement("div", {
    class: ["flex", "items-center", "gap-4", "", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
  }, [
    createElement("img", {
      class: ["size-20", "rounded-full", "object-cover"],
      src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      alt: "Profil"
    }),
    createElement("div", {
      class: ["flex", "flex-col"]
    }, [
      createElement("div", {
        class: ["text-white", "font-semibold"]
      }, "Ousmane Marra"),
      createElement("div", {
        class: ["text-gray-400", "text-sm"]
      }, "LIFE GOES ON 🎵")
    ])
  ]),

  // Settings menu items
  createElement("div", {
    class: ["flex", "flex-col", "gap-2"]
  }, [
    // Compte
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-user", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Compte")
    ]),

    // Confidentialité
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-lock", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Confidentialité")
    ]),

    // Discussions
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-comment", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Discussions")
    ]),

    // Notifications
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-bell", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Notifications")
    ]),

    // Raccourcis clavier
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-keyboard", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Raccourcis clavier")
    ]),

    // Aide
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-question", "text-gray-300"]
        })
      ),
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "Aide")
    ]),

    // Se déconnecter
    createElement("div", {
      class: ["flex", "items-center", "gap-5", "p-2", "hover:bg-gray-800", "rounded-lg", "cursor-pointer", ""],
      onclick: handleLogout
    }, [
      createElement("div", {
        class: ["w-10", "h-10", "bg-gray-700", "rounded-full", "flex", "items-center", "justify-center"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-sign-out-alt", "text-red-400"]
        })
      ),
      createElement("div", {
        class: ["text-red-400", "font-medium"]
      }, "Se déconnecter")
    ])
  ])
]);

const contacts = createElement("div", {
  class: ["w-full", "h-full", "px-5", "flex", "flex-col", "bg-gray-900"],
  id: "contacts-container"
}, [
  // Header with back arrow and title
  createElement("div", {
    class: ["flex", "items-center", "gap-4", "py-4"]
  }, [
      createElement("div", {
        class: ["text-white", "cursor-pointer"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-arrow-left", "text-xl"]
        })
      ),
      createElement("div", {
        class: ["text-2xl", "text-white", "font-bold", "flex-1"]
      }, "New chat"),
      createElement("div", {
        class: ["px-3", "py-1", "border", "border-gray-600", "rounded", "text-gray-400", "text-sm"]
      }, "New chat")
  ]),

  // Search bar
  createElement("div", {
    class: ["w-full", "py-1", "relative"]
  }, [
      createElement("i", {
        class: ["fa-solid", "fa-arrow-left", "absolute", "left-3", "top-1/2", "transform", "-translate-y-1/2", "text-teal-400"]
      }),
      createElement("input", {
        class: ["w-full", "bg-gray-800", "text-gray-300", "rounded-lg", "py-3", "pl-10", "pr-4", "placeholder-gray-500"],
        type: "text",
        placeholder: "Search name or number"
      })
  ]),

  createElement("div", {
    class: "h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full",
  },
    [
      // New options section
      createElement("div", {
        class: ["flex", "flex-col", "gap-1"]
      }, [
        // New group
        createElement("div", {
          class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
        }, [
          createElement("div", {
            class: ["w-12", "h-12", "bg-teal-500", "rounded-full", "flex", "items-center", "justify-center"]
          }, 
            createElement("i", {
              class: ["fa-solid", "fa-users", "text-white"]
            })
          ),
          createElement("div", {
            class: ["text-white", "font-medium"]
          }, "New group")
        ]),

        // New contact
        createElement("div", {
          class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
        }, [
          createElement("div", {
            class: ["w-12", "h-12", "bg-teal-500", "rounded-full", "flex", "items-center", "justify-center"]
          }, 
            createElement("i", {
              class: ["fa-solid", "fa-user-plus", "text-white"]
            })
          ),
          createElement("div", {
            class: ["text-white", "font-medium"]
          }, "New contact")
        ]),

        // New community
        createElement("div", {
          class: ["flex", "items-center", "gap-4", "p-3", "hover:bg-gray-800", "rounded-lg", "cursor-pointer"]
        }, [
          createElement("div", {
            class: ["w-12", "h-12", "bg-teal-500", "rounded-full", "flex", "items-center", "justify-center"]
          }, 
            createElement("i", {
              class: ["fa-solid", "fa-users-cog", "text-white"]
            })
          ),
          createElement("div", {
            class: ["text-white", "font-medium"]
          }, "New community")
        ])
      ]),

      // Contacts section
      createElement("div", {
        class: ["flex", "flex-col", "gap-1"],
        id: "contacts-list"
      },)
    ]),

  
]);

const status = createElement("div", {
  class: ["w-full", "h-full", "flex", "flex-col", "gap-3", "bg-[#0c1317]"],
  id: "status-zone"
}, [
  createElement("div", {class: ["w-full", "h-[15%]", "flex", "flex-col", "p-2", "bg-[#111b21]", "gap-4"]}, 
    [
      // Header with title and action buttons
  createElement("div", {
    class: ["flex", "items-center", "justify-between"]
  }, [
    createElement("div", {
      class: ["text-2xl", "text-white", "font-bold"]
    }, "Status"),
    createElement("div", {
      class: ["flex", "items-center", "gap-4"]
    }, [
      createElement("div", {
        class: ["text-white", "cursor-pointer", "hover:bg-gray-800", "p-2", "rounded"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-plus", "text-xl"]
        })
      ),
      createElement("div", {
        class: ["text-white", "cursor-pointer", "hover:bg-gray-800", "p-2", "rounded"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-ellipsis-vertical", "text-xl"]
        })
      )
    ])
  ]),

  // My status section
  createElement("div", {
    class: [ "flex", "items-center", "gap-4", "hover:bg-gray-800", "rounded-lg", "cursor-pointer",]
  }, [
    createElement("div", {
      class: ["relative"]
    }, [
      createElement("img", {
        class: ["w-14", "h-14", "rounded-full", "object-cover"],
        src: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        alt: "My status"
      }),
      createElement("div", {
        class: ["absolute", "bottom-0", "right-0", "w-5", "h-5", "bg-teal-500", "rounded-full", "flex", "items-center", "justify-center", "border-2", "border-gray-900"]
      }, 
        createElement("i", {
          class: ["fa-solid", "fa-plus", "text-white", "text-xs"]
        })
      )
    ]),
    createElement("div", {
      class: ["flex", "flex-col"]
    }, [
      createElement("div", {
        class: ["text-white", "font-medium"]
      }, "My status"),
      createElement("div", {
        class: ["text-gray-400", "text-sm"]
      }, "Click to add status update")
    ])
  ]),
    ]),
  

  // Recent section
  createElement("div", {
    class: ["flex", "flex-col", "gap-1", "bg-[#111b21]", "overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar-thumb]:bg-gray-800 [&::-webkit-scrollbar-thumb]:rounded-full"],
    id: "status-container"
  }, [
    // Section title
    

  ])
]);

export const centerBox = createElement("div", {
  class: ["w-[27%]", "h-full", "bg-[#111b21]", "flex", "flex-col", "items-center"]
}, [
    // formAddContact,
    // formAddGroup,
    // listContact,
    // listGroup,
    // listArchive,
    // membersModal,
    profil,
    listMessage,
    settings,
    contacts,
    status
]);

export const rightBox =createElement("div", {class: ["w-[68%]"]}, 
  [
    createElement("div", {class: ["w-full", "h-full", "hidden"]}, createElement("img", {class: ["w-full", "h-full"], src: "../public/default-img-message.png"})), 
    createElement("div", {
  class: ["w-full", "h-full", "bg-[#efe7d7]", "flex", "flex-col"]
}, [ 
  createElement("div", {
    class: ["w-full", "h-[7%]", "bg-[#202c33]", "flex", "justify-between", "items-center", "px-5"]
  }, [createElement("div", {class: ["flex", "items-center", "space-x-2"]}, 
      [
        createElement("img", {
        class: ["w-12", "h-12", "bg-gray-400", "rounded-full", "flex", "items-center", "justify-center"],
        id: "selected-avatar"
      }),
      createElement("div", {class: ["flex", "flex-col"]}, [
        createElement("div", {class: ["font-semibold", "text-lg", "text-white"], id: "selected-name"}, "Sélectionnez un contact"),
        createElement("div", {class: ["text-sm", "text-gray-600"], id: "selected-status"}, "typing...")
      ])
      ]),
      createElement("div", {
      class: ["flex", "gap-7"],
      vFor: {
        each: RIGHT_BUTTONS,
        render: (button) => {
          return createElement("button", {
            class: [],
            id: button.id,
            // onclick: () => handleRightButtonClick(button.id)
          }, createElement("i", {class: button.item}))
        }
      }
    }),
  ]),
  
  createElement("div", {
    class: ["h-full", "p-4", "overflow-y-auto", "bg-[url('../public/HD-wallpaper-whatsapp-dark-mode-whatsapp.jpg')]"],
    id: "messages-area"
  }),
  createElement("div", {class: ["w-full", "h-[7%]", "bg-[#202c33]", "flex", "items-center", "justify-between", "p-4"], id: "message-input-container"},
    [
      createElement("button", {}, createElement("i", {class: ["fa-solid", "fa-plus", "text-xl", "text-gray-500"]})),
      createElement("input", {
        class: ["w-[95%]", "p-2", "bg-[#2a3942]","rounded-lg", "", "text-gray-500", "placeholder:text-gray-500"],
        placeHolder: "Tapez un message"
      }),
      createElement("button", {}, createElement("i", {class: ["fa-solid", "fa-microphone", "text-xl", "text-gray-500"]})),
    ]
  )
])])

export const loginPage = createElement('div', {
   id: 'login-page',
   class: 'w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-4'
}, [
   createElement('div', {
       class: 'max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden'
   }, [
       createElement('div', {
           class: 'bg-whatsapp-teal dark:bg-whatsapp-dark p-4 text-center'
       }, [
           createElement('h1', {
               class: 'text-2xl font-bold text-white'
           }, 'YAATAL'),
           createElement('p', {
               class: 'text-green-100'
           }, 'Jokko ak sa gaayi!')
       ]),
       createElement('div', {
           class: 'p-6'
       }, [
           createElement('form', {
               id: 'login-form',
               class: 'space-y-4',
               onsubmit: handleLogin
           }, [
               createElement('div', {}, [
                   createElement('label', {
                       for: 'phone',
                       class: 'block text-sm font-medium text-gray-700 dark:text-gray-300'
                   }, 'Phone Number'),
                   createElement('input', {
                       type: 'tel',
                       id: 'phone',
                       name: 'phone',
                       class: 'mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-whatsapp-green focus:border-whatsapp-green dark:bg-gray-700 dark:border-gray-600 dark:text-white',
                       placeholder: 'Enter your phone number'
                   })
               ]),
               createElement('div', {
                   class: 'pt-2'
               }, [
                   createElement('button', {
                       type: 'submit',
                       id: 'login-button',
                       class: 'w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md transition-colors'
                   }, [
                       createElement('span', {
                           id: 'login-text',
                           class: ''
                       }, 'Log In'),
                       createElement('div', {
                           id: 'login-spinner',
                           class: 'hidden animate-spin rounded-full h-6 w-6 border-b-2 border-white'
                       })
                   ])
               ])
           ]),
           createElement('div', {
               id: 'error-message',
               class: 'hidden mt-4 text-red-500 text-center'
           }),
           createElement('div', {
               id: 'success-message',
               class: 'hidden mt-4 text-green-500 text-center'
           })
       ]),
       createElement('div', {
           class: 'px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center'
       }, [
           createElement('p', {
               class: 'text-sm text-gray-600 dark:text-gray-300'
           }, 'By logging in, you agree to our Terms and Privacy Policy')
       ])
   ])
]);

