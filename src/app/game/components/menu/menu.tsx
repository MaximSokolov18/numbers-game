import {MenuButton} from './menu-button';

export const Menu = () => {
    return (
        <nav>
            <ul className="flex gap-2">
                <MenuButton href="/game">Game</MenuButton>
            </ul>
        </nav>
    );
};
