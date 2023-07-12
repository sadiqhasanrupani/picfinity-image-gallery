//^ components
import React, { HTMLAttributes, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

//^ material UI component
import {
  Icon,
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  Menu,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

import styles from "./Header.module.scss";

//^ components
import Logo from "../Logo/LogoInvert/LogoInvert";
import { signOut } from "next-auth/client";

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {}

// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Logout"];

const Header = ({ className }: HeaderProps) => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  //^ session
  const [session, loading] = useSession();

  const firstLetter = session?.user?.name?.charAt(0);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    signOut({ redirect: true, callbackUrl: "/login" });
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className={styles["app-bar"]}>
      <Container maxWidth="xl" className={styles["container"]}>
        <Toolbar disableGutters className={styles["tool-bar"]}>
          <Link href={"/gallery"}>
            <Logo />
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            {/* <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton> */}
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {/* {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  {page}
                </MenuItem>
              ))} */}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                {page}
              </Button>
            ))} */}
          </Box>

          <Box sx={{ flexGrow: 0 }} className={styles["setting-box"]}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className={styles["profile-div"]}>{firstLetter}</div>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  {setting}
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
