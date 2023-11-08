import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PersonIcon from '@mui/icons-material/Person';
import Person2Icon from '@mui/icons-material/Person2';
import Person3Icon from '@mui/icons-material/Person3';
import Person4Icon from '@mui/icons-material/Person4';
import ArticleIcon from '@mui/icons-material/Article';
import HomeIcon from '@mui/icons-material/Home';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import { useNavigate } from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthGoogleContext} from "../contexts/authGoogle";
import {useAppStore} from "../configs/appStore";
import LogoutIcon from "@mui/icons-material/Logout";
import TopicIcon from '@mui/icons-material/Topic';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import FolderSpecialSharpIcon from '@mui/icons-material/FolderSpecialSharp';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        backgroundColor: '#1976D2',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': {
                ...openedMixin(theme),
                backgroundColor: '#1976D2',
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': {
                ...closedMixin(theme),
                backgroundColor: '#1976D2',
            },
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const navigate = useNavigate();
    const open = useAppStore((state) => state.dopen);

    const { user, userLogadoSessao, signOut } = useContext(AuthGoogleContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Verifique se o userLogadoSessao está disponível
        if (userLogadoSessao) {
            setIsLoading(false);
        }
    }, [userLogadoSessao]);

    // Verifique se o usuário está logado
    if (!user) {
        return null; // Não renderize a Sidenav se o usuário não estiver logado
    }
    if (isLoading) {

    } else {
        return (
            <Box sx={{display: 'flex'}}>
                <CssBaseline/>
                <Box height={30}/>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton>
                            {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                        </IconButton>
                    </DrawerHeader>
                    <Divider/>
                    <List>
                        {/* Home */}
                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                            navigate("/home")
                        }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: 'white'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    <HomeIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Home" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>

                        </ListItem>

                        {/* Usuários */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{ display: 'block' }} onClick={() => {
                                navigate('/usuarios');
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white',
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white',
                                        }}
                                    >
                                        <PersonIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Usuários" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        )}

                        {/* Clientes */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/clientes")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <Person2Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Clientes" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}

                        {/* Redatores */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/redatores")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <Person3Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Redatores" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}

                        {/* Revisores */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/revisores")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <Person4Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Revisores" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}

                        {/* Administradores */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/administradores")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <SupervisorAccountIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Administradores" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Pedidos de Artigos */}
                        {userLogadoSessao && (userLogadoSessao.tipo === 'CLIENTE' || userLogadoSessao.tipo === 'ADMINISTRADOR') && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/pedidos-artigos")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <NoteAltIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Pedidos de Artigo" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Gerenciar Pedidos de Artigos */}
                        {userLogadoSessao && (userLogadoSessao.tipo === 'ADMINISTRADOR') && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/gerenciar-pedidos-artigos")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <FolderSpecialSharpIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Gerenciar Pedidos" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Artigos */}
                        {userLogadoSessao && userLogadoSessao.tipo === 'ADMINISTRADOR' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/artigos")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}  
                                    >
                                        <ArticleIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Artigos" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Meus Artigos Vinculados */}
                        {userLogadoSessao && userLogadoSessao.tipo !== 'USUARIO' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/meus-artigos")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <DatasetLinkedIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Meus Artigos" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Histórico de Artigos */}
                        {userLogadoSessao && userLogadoSessao.tipo !== 'USUARIO' && (
                            <ListItem disablePadding sx={{display: 'block'}} onClick={() => {
                                navigate("/historico-artigos")
                            }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                        color: 'white'
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                            color: 'white'
                                        }}
                                    >
                                        <TopicIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary="Histórico de Artigos" sx={{opacity: open ? 1 : 0}}/>
                                </ListItemButton>
                            </ListItem>
                        )}
                        {/* Logout */}
                        <ListItem disablePadding sx={{display: 'block'}} onClick={() => signOut()}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: 'white'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'white'
                                    }}
                                >
                                    <LogoutIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Logout" sx={{opacity: open ? 1 : 0}}/>
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>

            </Box>
        );
    }
}