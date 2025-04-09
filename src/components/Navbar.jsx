import { useSelector, useDispatch } from "react-redux";
import { SunIcon, MoonIcon, GlobeAltIcon } from "@heroicons/react/24/solid";
import { Navbar as FlowbiteNavbar, Dropdown } from "flowbite-react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  // Replace context with Redux
  const { theme } = useSelector(state => state.theme);
  const darkMode = theme === 'dark';
  
  return (
    <FlowbiteNavbar
      fluid
      className={`fixed w-full z-20 shadow-md ${
        darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <FlowbiteNavbar.Brand as={Link} to="/">
        <GlobeAltIcon className="h-6 w-6 mr-3 text-blue-500" />
        <span className="self-center whitespace-nowrap text-xl font-semibold">
          Country Explorer
        </span>
      </FlowbiteNavbar.Brand>

      <div className="flex md:order-2">
        <ThemeToggle className="mr-2" />

        <Dropdown label="Resources" arrowIcon>
          <Dropdown.Item as={Link} to="/favorites">
            Favorites
          </Dropdown.Item>
          <Dropdown.Item as={Link} to="/statistics">
            Statistics
          </Dropdown.Item>
          <Dropdown.Item
            as="a"
            href="https://restcountries.com/"
            target="_blank"
          >
            REST Countries API
          </Dropdown.Item>
        </Dropdown>

        <FlowbiteNavbar.Toggle />
      </div>

      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link as={Link} to="/" active>
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link as={Link} to="/about">
          About
        </FlowbiteNavbar.Link>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}